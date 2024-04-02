const  User  = require('../models/User');
const Product = require('../models/Product');

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
        const cartInfo = req.body;
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            {cart: cartInfo}, 
            {new: true}
        );
        res.status(200).json(user);
    } catch(err) {
        return next(err);
    }
};

getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const cartWithDetails = await Promise.all(user.cart.map(async (item) => {
            const product = await Product.findById(item.productId);
            return {
              id: item.productId,
              quantity: item.quantity,
              productInfo: product
            };
          }));
        res.status(200).json(cartWithDetails);
    } catch(err) {
        return next(err);
    }
};

module.exports = {
    updatePassword,
    updateCart,
    getCart
};