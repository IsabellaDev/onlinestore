const express = require('express')
const router = express.Router();

const loginModel = require('../models/customerRegistration');

const productModel = require("../models/product");

const bcrypt = require("bcryptjs");

const isAuthenticated = require("../middleware/authentication");

const dashboardLoader = require("../middleware/authorization");

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login Page",
        heading: "Up In The Air Online Store"
    });
});

router.post("/", (req, res) => {
    let errorE = "", errorP = "";
    let c = { colorEmail: "", colorPwd: "" };
    if (req.body.email == "") {
        errorE = "! Please enter a valid email";
        c.colorEmail = "red";
    }
    if (req.body.password == "") {
        errorP = "! Please enter your password";
        c.colorPwd = "red";
    }

    if ((errorE != "") || (errorP != "")) {
        res.render("login", {
            title: "Login Page",
            heading: "Up In The Air Online Store",
            errorE: errorE,
            errorP: errorP,
            c: c
        });
    }
    else {
        loginModel.findOne({ email: req.body.email })
            .then(user => {
                if (user == null) {
                    errorE = "Sorry, your email and/or password is incorrect";

                    res.render(
                        "login", {
                        title: "Login Page",
                        heading: "Up In The Air Online Store",
                        errorE: errorE

                    });
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(isMatched => {
                            if (isMatched) {
                                req.session.userInfo = user;
                                    res.redirect("/user/profile");
     
                            }
                            else {
                                errorE = "Sorry, your email and/or password is incorrect";
                                res.render(
                                    "login", {
                                    title: "Login Page",
                                    heading: "Up In The Air Online Store",
                                    errorE: errorE

                                });
                            }
                        })
                        .catch(err=>console.log(`Error occured when loging in: ${err}`));
                }
            })
            .catch(err=>console.log(`Error occured when loging in: ${err}`));

    }

});

router.get("/profile", isAuthenticated, dashboardLoader);


router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/user");
});




module.exports = router;