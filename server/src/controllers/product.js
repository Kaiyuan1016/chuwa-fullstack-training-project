const { Product } = require('../models/Product');

getAllProducts = async (req, res) => {
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
            // totalPages: totalPages
        );
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params?.id);
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        if(!product.name || !product.price || !product.stockQuantity) {
            return res.status(400).json({message: 'Please provide all fields'});
        }
        await product.save();
        res.status(201).json(product);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

updateProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params?.id, req.body, {new: true});
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params?.id);
        res.status(200).json({message: 'Product deleted'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};