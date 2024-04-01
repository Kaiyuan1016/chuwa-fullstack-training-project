const express = require('express'); 
const router = express.Router({ mergeParams: true });
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const { loginRequired } = require('../middleware/auth');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', loginRequired, createProduct);

router.put('/:id', loginRequired, updateProduct);

router.delete('/:id', loginRequired, deleteProduct);

module.exports = router;