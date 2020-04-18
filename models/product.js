const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    hot: {
        type: Boolean,
        required: true
    },
    src: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const productModel = mongoose.model('Product', productSchema);

const list = [
    {
        name: 'Fire TV Stick 4K',
        price: 59.99,
        desc: 'Fire TV Stick 4K with Alexa Voice Remote, streaming media player',
        category: 'Smart Home',
        quantity: 50,
        hot: true,
        src: '/img/list-1.jpg'
    },
    {
        name: 'Fire TV Stick',
        price: 39.99,
        desc: 'Fire TV Stick with Alexa Voice Remote, streaming media player',
        category: 'Smart Home',
        quantity: 50,
        hot: true,
        src: '/img/list-2.jpg'
    },
    {
        name: 'Echo Dot (3rd gen)',
        price: 44.99,
        desc: 'Echo Dot (3rd gen) - Smart speaker with Alexa - Charcoal',
        category: 'Smart Home',
        quantity: 50,
        hot: true,
        src: '/img/list-3.jpg'
    },
    {   
        name: 'Kindle Paperwhite',
        price: 114.99,
        desc: 'Kindle Paperwhite – Now Waterproof with 2x the Storage',
        category: 'Devices',
        quantity: 50,
        hot: true,
        src: '/img/list-4.jpg'
    },
    {   
        name: 'Fire HD 8 Tablet',
        price: 99.99,
        desc: 'Fire HD 8 Tablet | 8\" HD Display, 16 GB, Black',
        category: 'Smart Home',
        quantity: 50,
        hot: true,
        src: '/img/list-5.jpg'
    },
    {
        name: 'Echo Dot (3rd gen)',
        price: 44.99,
        desc: 'Echo Dot (3rd gen) - Smart speaker with Alexa - Plum',
        category: 'Smart Home',
        quantity: 50,
        hot: true,
        src: '/img/list-6.jpg'
    }
];

   /* list.forEach((element)=>{
        let pro = new productModel(element);
        pro.save()
        .then()
        .catch(err=>console.log(`Error occured when inserting product info into database`));
    });*/






module.exports = productModel;