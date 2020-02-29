const express = require("express"); //this imports the express package that was installed within your application


const exphbs = require("express-handlebars");



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


const generalController = require("./controllers/general");
const customerRegistrationController = require("./controllers/customerRegistration");
const loginController=require("./controllers/login");

app.use("/", generalController);
app.use("/customerRegistration", customerRegistrationController);
app.use("/login", loginController);



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running now!");
})