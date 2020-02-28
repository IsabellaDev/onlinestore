const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs= require("express-handlebars");

const model=require("./model/products.js");

const bodyParser=require('body-parser');

//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req,res)=>{

    res.render("home",{
        title: "Home Page",
        heading: "Amazon.ca",
        categories: model.displayCategories(),
        bestSellers: model.displayBestsellers()
    });

});

app.get("/products", (req,res)=>{
    res.render("products",{
        title: "Products Page",
        heading: "Amazon.ca",
        list: model.displayProductList()
    });
});

app.get("/customerRegistration", (req,res)=>{
    res.render("customerRegistration",{
        title: "Customer Page",
        heading: "Amazon.ca"
    });
});

app.get("/login", (req,res)=>{
    res.render("login",{
        title: "Login Page",
        heading: "Amazon.ca"
    });
});

app.post("/login", (req,res)=>{
    let errorE=[];let errorP=[];
    if(req.body.email==""){
        errorE.push("! Please enter a valid email");
    }
    if(req.body.password==""){
        errorP.push("! Please enter your password");
    }

    if ((errorE!="") || (errorP!="")){
      res.render("login",{
            title:"Login Page",
            heading: "Amazon.ca",
            errorE: errorE,
            errorP: errorP
        });
    }
    else {
        res.redirect("/");
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running now!");
})