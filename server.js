const express = require("express"); //this imports the express package that was installed within your application
const exphbs = require("express-handlebars");

const mongoose = require('mongoose');//import mongoose 

const fileUpload = require('express-fileupload');

const session = require('express-session');

const bodyParser = require('body-parser');

require('dotenv').config({ path: "./config/keys.env" });//load the environment variable file

const app = express(); // this creates your express app object
//This tells express to set up our template engine has handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

const generalController = require("./controllers/general");
const customerRegistrationController = require("./controllers/customerRegistration");
const userController = require("./controllers/user");
const productController = require("./controllers/product.js");
const orderController = require("./controllers/cart");


app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
});





app.use(fileUpload());


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true } // only used when dealing with https
  }))

  app.use((req,res,next)=>{

   res.locals.user=req.session.userInfo;

    next();
})



app.use("/", generalController);
app.use("/customerRegistration", customerRegistrationController);
app.use("/user", userController);
app.use("/products", productController);
app.use("/orders",orderController);

//synchronous operation 
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MONGODB, YAY`)
    )
    .catch((err) => console.log(`Error occured: ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running now!");
})
