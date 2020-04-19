const express = require('express');
const router = express.Router();
const productModel = require("../models/product");

const userModel = require("../models/customerRegistration");

const cartModel = require("../models/cart");

const isAuthenticated = require("../middleware/authentication");





router.post("/add", isAuthenticated, (req, res) => {

    console.log(req.session.userInfo.email);
    const newCart = {
        email: req.session.userInfo.email,
        //productId: req.params.id,
        name: req.body.name,
        price: req.body.price,
        number: req.body.qty
    };
    
    const cart = new cartModel(newCart);
    cart.save()
        .then(() => {
            console.log("product saved into database for order");
        })
        .catch(err => console.log(`Error happened when inserting cart data into dbs: ${err}`));

});


router.get("/cart", isAuthenticated, (req, res) => {
    cartModel.find({ email: req.session.userInfo.email })
        .then((carts) => {
            const cart = carts.map(cart => {
                return {
                    email: cart.email,
                    productId: cart.id,
                    name: cart.name,
                    price: cart.price,
                    number: cart.qty
                }
            });
            res.render("orders/cart", {
                cart: cart
            })
        })

});

router.get("/checkout", isAuthenticated, (req, res) => {
    cartModel.find({ email: req.session.userInfo.email })
    .then((carts) => {
        const cart = carts.map(cart => {
            return {
                email: cart.email,
                productId: cart.id,
                name: cart.name,
                price: cart.price,
                number: cart.qty
            }
        });
        let str="";
        cart.forEach((elem)=>{
            str+=(elem.name+', price CDN $'+elem.price+' with the quantity of '+elem.number+'<br>');
        });
        console.log(str);
        console.log(cart);
            const orderEmail = require('@sendgrid/mail');
            orderEmail.setApiKey(process.env.SEND_GRID_API_KEY);

            

            const orderMsg = {
                to: `${req.session.userInfo.email}`,
                from: `dearduck@126.com`,
                subject: 'You have placed your order successfully!',
                html:
                    `Hi Dear ${req.session.userInfo.firstName} ${req.session.userInfo.lastName}, <br>
                    Thank you for choosing our service, and you have successfully placed your order！
                    <br>
                    Please check your order details below: 
                    ${str}

                    <br>
                    If you have any further concerns, please feel free to contact us at any time!

                    Best regards,<br>
                    Customer Service Team<br>
                    Up In The Air Online Store`
            };
            console.log(orderMsg);
            //Asynchornous operation (no exact executing time
            orderEmail.send(orderMsg)
                .then(() => {
                    cartModel.deleteMany({ email: req.session.userInfo.email })
                        .then(() => {

                            res.render("orders/checkout");
                        })

                })
                .catch(err => console.log(`Error happended when cleaning shopping cart: ${err}`))

        })
        .catch(err => `Error happened when sending email: ${err}`);

});
    




module.exports = router;