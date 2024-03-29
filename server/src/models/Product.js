const mongoose = require('mongoose');
const { Schema } = mongoose;

// name description category price /instock quantity/ image link
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };