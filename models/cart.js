const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    productId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;