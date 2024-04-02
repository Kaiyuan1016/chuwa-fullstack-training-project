const express = require('express');
const router = express.Router();
const { signup, signin, requestPasswordReset, resetPassword } = require('../controllers/auth');
//const { requestPasswordReset } = require('../controllers/passwordReset');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/requestPasswordReset', requestPasswordReset);
router.post('/resetPassword', resetPassword);

module.exports = router;