const express = require('express')
const router = express.Router();
const productModel = require("../models/product");

const isAuthenticated = require("../middleware/authentication");
const isAdmin = require("../middleware/admin");

const path = require("path");

router.get("/", (req, res) => {
    productModel.find()
        .then((list) => {

            const pro = list.map(product => {
                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    desc: product.desc,
                    category: product.category,
                    quantity: product.quantity,
                    hot: product.hot,
                    src: product.src
                }
            });

            res.render("products/products", {
                title: "Products Page",
                heading: "Up In The Air Online Store",
                list: pro

            });
        })

});

router.get("/add", isAuthenticated, isAdmin, (req, res) => {
    res.render("products/addProduct");
});

router.post("/add", isAuthenticated, isAdmin, (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        category: req.body.category,
        quantity: req.body.quantity,
        hot: req.body.hot
    };
    const pro = new productModel(newProduct);
    pro.save()
        .then((pro) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No picture file were uploaded.');
            }
            req.files.src.name = `pro_pic${pro._id}${path.parse(req.files.src.name).ext}`;
            req.files.src.mv(`public/img/${req.files.src.name}`)
                .then(() => {
                    productModel.updateOne({ _id: pro._id }, {
                        src: req.files.src.name
                    })
                        .then(() => {
                            res.redirect("/products");
                        })
                })
                .catch(err => console.log(`Error occurred when uploading img: ${err}`));

        })
        .catch(err => console.log(`error happended when creating a product: ${err}`));
});

router.post("/search", (req, res) => {

    if (req.body.search=="") {
        productModel.find()
        .then((products)=>{
            const prod=products.map(product=>{
                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    desc: product.desc,
                    hot: product.hot,
                    src: product.src
                }
            });
            res.render("products/products", {
                list: prod
            });
        })
    }
    else {

        productModel.find({category: req.body.search})
        .then((products)=>{
            const prod=products.map(product=>{
                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    desc: product.desc,
                    hot: product.hot,
                    src: product.src
                }
            });
            res.render("products/products", {
                list: prod
            });
        })
    }
});

router.get("/update/:id", (req, res) => {
    productModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, price, desc, category, quantity, hot, src } = product;
            res.render("products/updateProduct", {
                _id,
                name,
                price,
                desc,
                category,
                quantity,
                hot,
                src
            });
        })
        .catch(err => `Error happened when trying to update product info: ${err}`);
});

router.put("/update/:id", (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        category: req.body.category,
        quantity: req.body.quantity,
        hot: req.body.hot
    };
    productModel.updateOne({ _id: req.params.id }, product)
        .then(() => {
          
                res.redirect('/user/profile');


        })
        .catch(err=>`Error happened when updating product info: ${err}`);

});

router.delete("/delete/:id",(req,res)=>{
    productModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/user/profile");
    })
    .catch(err=>`Error occured when deleting product info from database: ${err}`);
})

router.get("/detail/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        const { _id, name, price, desc, category, quantity, hot, src} = product;
        res.render("products/detail", {
            _id,
            name,
            price,
            desc,
            category,
            quantity,
            hot,
            src
        });
    })
    .catch(err => `Error happened when trying to extract product detail from database: ${err}`);
    
});



module.exports = router;