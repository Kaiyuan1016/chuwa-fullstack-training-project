const { Product } = require('../models/Product');

getAllProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const sortBy = req.query.sortBy || 'createAt';
    const sortOrder = req.query.sortOrder || 'asc';
    
    const skip = (page - 1) * pageSize;
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    try {
        const products = await Product.find()
            .sort(sort)
            .skip(skip)
            .limit(pageSize);
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);
        res.json(
            products,
            // currentPage: page,
            // TODO: totalPages: totalPages
        );
    } catch(err) {
        return next(err);
    }
}

getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params?.id);
        res.status(200).json(product);
    } catch(err) {
        return next(err);
    }
}

createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        if(!product.name || !product.price || !product.stockQuantity) {
            return res.status(400).json({message: 'Please provide all fields'});
        }
        await product.save();
        res.status(201).json(product);
    } catch(err) {
        return next(err);
    }
}

updateProduct = async(req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params?.id, req.body, {new: true});
        res.status(200).json(product);
    } catch(err) {
        return next(err);
    }
}

deleteProduct = async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params?.id);
        res.status(200).json({message: 'Product deleted'});
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};