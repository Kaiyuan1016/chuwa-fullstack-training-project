const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
      let token = jwt.sign(
        {
          id,
          cart
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        cart,
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
      message: 'Invalid Email / Password.'
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



exports.requestPasswordReset = async function(req, res, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // To prevent email enumeration, always return a successful response
            return res.status(200).json({ message: 'If an account with that email exists, we will send a password reset link.' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set the reset token and its expiration on the user model
        user.passwordResetToken = hashedToken;
        // Example: Set token to expire in 1 hour
        user.passwordResetExpires = Date.now() + 3600000; 

        await user.save();

        // Construct reset URL
        // Adjust to your frontend's password reset page URL
        const resetUrl = `http://localhost:3000/password-reset/${resetToken}`;

        // Email setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Password Reset Link',
            text: `To reset your password, please click on this link: ${resetUrl}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Send Mail Error:', error);
                return next({
                    status: 500,
                    message: 'Error sending password reset email.'
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Password reset link sent.' });
            }
        });
    } catch (err) {
        console.error('Password Reset Error:', err);
        return next({
            status: 500,
            message: 'Error processing password reset request.'
        });
    }
};
