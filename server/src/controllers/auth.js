const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.signin = async function (req, res, next) {
  try {
    // finding a user
    const user = await User.findOne({
      email: req.body.email
    });

    const { id, cart } = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      // Fetch product info for each item in cart
      const cartWithDetails = await Promise.all(cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          id: item.productId,
          quantity: item.quantity,
          productInfo: product
        };
      }));
      let token = jwt.sign(
        {
          id,
          cart: cartWithDetails
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        cart: cartWithDetails,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email / Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: `Invalid Email / Password.${err}`
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    let user = await User.create(req.body);
    let { id } = user;
    let token = await jwt.sign(
      {
        id
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      token
    });
  } catch (err) {
    // see what kind of error
    // if it is a certain error
    // responde with username/email already taken
    // otherwise just send back with 400

    // if there is already a user with that email
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};



const generateTemporaryToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendPasswordResetEmail = async (email, token) => {
  console.log(process.env.EMAIL_ADDRESS);
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Password Reset', 
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
      + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
      + `http://localhost:3000/resetpassword?token=${token}\n\n`
      + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};


exports.forgotpassword = async(req, res, next) => {
  const {email} = req.body;
  console.log(email);
  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(404).json({error: 'Email not found'});
    }
    const token = generateTemporaryToken({email});
    sendPasswordResetEmail(email, token);
    res.json({message:'Password reset email sent'});
  } catch(err) {
    next(err);
  }
}

const verifyTemporaryToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};

exports.resetpassword = async(req, res, next) => {
  const { email, newPassword } = req.body;
  if(email === '' || newPassword === '') {
    return res.status(400).json({message: 'Please enter both email and new password!'});
  }
  const { token } = req.query;
  try {
    const decoded = verifyTemporaryToken(token);
    if (!decoded || decoded.email !== email) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}