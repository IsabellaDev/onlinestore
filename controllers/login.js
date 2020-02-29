const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login Page",
        heading: "Amazon.ca"
    });
});

router.post("/", (req, res) => {
    let errorE = "", errorP = "";
    if (req.body.email == "") {
        errorE = "! Please enter a valid email";
    }
    if (req.body.password == "") {
        errorP = "! Please enter your password";
    }

    if ((errorE != "") || (errorP != "")) {
        res.render("login", {
            title: "Login Page",
            heading: "Amazon.ca",
            errorE: errorE,
            errorP: errorP
        });
    }
    else {
        res.redirect("/");
    }

});

module.exports=router;