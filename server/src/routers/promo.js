const express = require('express');
const router = express.Router();
const Promo = require('../models/Promo');

router.post('/validate', async(req, res, next) => {
    const {promoCode} = req.body;
    console.log(promoCode);
    try {
        const existingPromoCode = await Promo.findOne({code: promoCode});

        if(existingPromoCode) {
            res.json({isValid: true, discount: existingPromoCode.discount});
        } else {
            res.json({isValid: false});
        }
    } catch(err) {
        return next(err);
    }
});

router.post('/', async(req, res, next) => {
    try {
        const promo = new Promo(req.body);
        if(!promo.code || !promo.discount) {
            return res.status(400).json({message: 'Please provide all fields of the promo code.'});
        }
        await promo.save();
        res.status(201).json(promo);
    } catch(err) {
        next(err);
    }
})

module.exports = router;