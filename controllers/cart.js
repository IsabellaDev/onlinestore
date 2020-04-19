const express = require('express');
const router = express.Router();
const productModel = require("../models/product");

const userModel=require("../models/customerRegistration");

const cartModel=require("../models/cart");

const isAuthenticated = require("../middleware/authentication");



router.get("/",isAuthenticated,(req,res)=>{

    res.render("orders/cart");
});



router.post("/add", isAuthenticated,(req,res)=>{
    console.log(`${user.email}${req.body.name}`);
    console.log(req.body.quantity);
    
});


module.exports = router;