const express = require('express')
const router = express.Router();

const model = require("../models/products");

router.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        heading: "Up In The Air Online Store",
        categories: model.displayCategories(),
        bestSellers: model.displayBestsellers()
    });

});

router.get("/products", (req, res) => {
    res.render("products", {
        title: "Products Page",
        heading: "Up In The Air Online Store",
        list: model.displayProductList()
    });
});

module.exports=router;