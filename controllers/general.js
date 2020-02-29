const express = require('express')
const router = express.Router();

const model = require("../model/products");

router.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        heading: "Amazon.ca",
        categories: model.displayCategories(),
        bestSellers: model.displayBestsellers()
    });

});

router.get("/products", (req, res) => {
    res.render("products", {
        title: "Products Page",
        heading: "Amazon.ca",
        list: model.displayProductList()
    });
});

module.exports=router;