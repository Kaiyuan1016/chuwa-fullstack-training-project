const jwt = require('jsonwebtoken');
const User = require('../models/User');

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