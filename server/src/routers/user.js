const express = require('express');
const router = express.Router();
const { updatePassword, updateCart } = require('../controllers/user');
const { loginRequired } = require('../middleware/auth');
// router.post('/forgot-password', updatePassword); // '/api/user/forgot-password'

// '/api/user/:userId/cart'
router.put('/:userId/cart',loginRequired, updateCart);

module.exports = router;