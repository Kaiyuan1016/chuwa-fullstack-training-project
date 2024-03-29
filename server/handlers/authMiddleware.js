const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors'); 

const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            throw new CustomAPIError('No token provided, authorization denied', 401);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.user || !decoded.user.id) {
            throw new CustomAPIError('Invalid token', 401);
        }

        req.user = { _id: decoded.user.id };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { authenticationMiddleware };
