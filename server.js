const express = require("express"); //this imports the express package that was installed within your application


const exphbs = require("express-handlebars");

const model = require("./model/products.js");

const bodyParser = require('body-parser');
require('dotenv').config({path:"./config/keys.env"});//load the environment variable file

const app = express(); // this creates your express app object
//This tells express to set up our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

//const generalController=require("./controller/general");
//const 

app.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        heading: "Amazon.ca",
        categories: model.displayCategories(),
        bestSellers: model.displayBestsellers()
    });

});

app.get("/products", (req, res) => {
    res.render("products", {
        title: "Products Page",
        heading: "Amazon.ca",
        list: model.displayProductList()
    });
});

app.get("/customerRegistration", (req, res) => {
    res.render("customerRegistration", {
        title: "Customer Registration Page",
        heading: "Amazon.ca"
    });
});
app.post("/customerRegistration", (req, res) => {
    let errorFName = "", errorLName = "", errorE = "", errorP = "", errorPP = "";
    if (req.body.firstName == "") {
        errorFName = "! Please enter your First Name";
    }
    else {
        let valid = false;
        for (let i = 0; i < req.body.firstName.length; i++) {
            if ((req.body.firstName[i] >= 'A' && req.body.firstName[i] <= 'Z') || (req.body.firstName[i] >= 'a' && req.body.firstName[i] <= 'z')) {
                valid = true;
            }
            else { valid = false; }
        }
        if (!valid) {
            errorFName = "! First Name should only contain letters, please try again";
        }
    }
    if (req.body.lastName == "") {
        errorLName = "! Please enter your Last Name";
    }
    else {
        let valid = false;
        for (let i = 0; i < req.body.lastName.length; i++) {
            if ((req.body.lastName[i] >= 'A' && req.body.lastName[i] <= 'Z') || (req.body.lastName[i] >= 'a' && req.body.firstName[i] <= 'z')) {
                valid = true;
            }
            else { valid = false; }
        }
        if (!valid) {
            errorLName = "! Last Name should only contain letters, please try again";
        }
    }
    if (req.body.email == "") {
        errorE = "! Please enter your Email Address";
    }
    if (req.body.password.length < 6 || req.body.password > 12) {
        errorP = "! The password must be 6 to 12 characters";
    }
    else if (req.body.password != req.body.passwordAgain) {
        errorPP = "! The password entered does not match, please try again";
    }


    if (errorFName != "" || errorLName != "" || errorE != "" || errorP != "" || errorPP != "") {
        res.render("customerRegistration", {
            title: "Customer Registration Page",
            heading: "Amazon.ca",
            errorFName: errorFName,
            errorLName: errorLName,
            errorE: errorE,
            errorP: errorP,
            errorPP: errorPP
        });
    }
    else {
        res.redirect("/");
    }

});


app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login Page",
        heading: "Amazon.ca"
    });
});

app.post("/login", (req, res) => {
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running now!");
})