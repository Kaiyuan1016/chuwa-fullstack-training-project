const  User  = require('../models/User');

updatePassword = async (req, res, next) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).send('User not found');
        }
        //TODO: if email validate, send an change password email
    } catch(err) {
        return next(err);
    }
};

updateCart = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: {cart: req.body.cart}}, 
            {new: true}
        );
        res.status(200).json(user);
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    updatePassword,
    updateCart
};