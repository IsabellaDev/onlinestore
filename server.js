const express = require("express"); //this imports the express package that was installed within your application

const app = express(); // this creates your express app object

const exphbs= require("express-handlebars");

const model=require("./model/products.js");

//This tells express to set up our template engine has handlebars
app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

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

const PORT = 3000 || process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server is running now!");
})