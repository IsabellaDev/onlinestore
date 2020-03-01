const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login Page",
        heading: "Up In The Air Online Store"
    });
});

router.post("/", (req, res) => {
    let errorE = "", errorP = "";
    let c={colorEmail:"", colorPwd: ""};
    if (req.body.email == "") {
        errorE = "! Please enter a valid email";
        c.colorEmail="red";
    }
    if (req.body.password == "") {
        errorP = "! Please enter your password";
        c.colorPwd="red";
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
        res.redirect("/");
    }

});

module.exports=router;