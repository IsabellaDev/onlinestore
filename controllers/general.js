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


module.exports=router;