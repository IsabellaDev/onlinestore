const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RegistrationModel = require("../models/customerRegistration");


//const bcrypt=require('bcryptjs'); //import bcrypt module to encrypt the pwd

router.get("/", (req, res) => {
    res.render("customerRegistration", {
        title: "Customer Registration Page",
        heading: "Up In The Air Online Store"
    });
});

router.post("/", (req, res) => {
    let errorFName = "", errorLName = "", errorE = "", errorP = "", errorPP = "";
    let c = { borderfn: "", borderln: "", borderEmail: "", borderPwd: "", borderPwdAgn: "" };
    if (req.body.firstName == "") {
        errorFName = "! Please enter your First Name";
        c.borderfn = "red";
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
            c.borderfn = "red";
        }
    }
    if (req.body.lastName == "") {
        errorLName = "! Please enter your Last Name";
        c.borderln = "red";
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
            c.borderln = "red";
        }
    }

    if (req.body.password.length < 6 || req.body.password.length > 12) {
        errorP = "! The password must be 6 to 12 characters";
        c.borderPwd = "red";
    }
    else if (req.body.password != req.body.passwordAgain) {
        errorPP = "! The password entered does not match, please try again";
        c.borderPwdAgn = "red";
    }

    if (req.body.email == "") {
        errorE = "! Please enter your Email Address";
        c.borderEmail = "red";
    }

    const { firstName, lastName, email, password, passwordAgain } = req.body;
    if (errorFName != "" || errorLName != "" || errorE != "" || errorP != "" || errorPP != "") {

        res.render("customerRegistration", {
            title: "Customer Registration Page",
            heading: "Up In The Air Online Store",
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordAgain: passwordAgain,
            errorFName: errorFName,
            errorLName: errorLName,
            errorE: errorE,
            errorP: errorP,
            errorPP: errorPP,
            c: c
        });

    }

    else {// check if the email is already registered
        RegistrationModel.findOne({ email: req.body.email })
            .then(user => {
                if (user != null) {
                    errorE = "! The email you entered has already been registered";
                    c.borderEmail = "red";
                }

                if (errorE != "") {

                    res.render("customerRegistration", {
                        title: "Customer Registration Page",
                        heading: "Up In The Air Online Store",
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        passwordAgain: passwordAgain,
                        errorFName: errorFName,
                        errorLName: errorLName,
                        errorE: errorE

                    });

                }
                else {

                    //send valid registration data to database

                    const sendEmail = require('@sendgrid/mail');
                    sendEmail.setApiKey(process.env.SEND_GRID_API_KEY);

                    const msg = {
                        to: `${email}`,
                        from: `dearduck@126.com`,
                        subject: 'You have registered successfully!',
                        html:
                            `Hi Dear ${firstName} ${lastName}, <br>
            Thank you for choosing our service, and you have successfully registered as a member now!<br>
            Congratulations and enjoy your journey with our website!<br>
            <br>
            Best regards,<br>
            Customer Service Team<br>
            Up In The Air Online Store`
                    };

                    //Asynchornous operation (no exact executing time
                    sendEmail.send(msg)
                        .then(() => {
                            const newAccount = {
                                firstName,
                                lastName,
                                email,
                                password
                            };

                            const accountInfo = new RegistrationModel(newAccount);
                            accountInfo.save()
                                .then(() => {
                                    const { firstName, lastName, email } = accountInfo;
                                    res.render("welcome", {
                                        firstName,
                                        lastName,
                                        email
                                    })
                                })
                                .catch(err => console.log(`Oops something went wrong: ${err}`));
                        })
                        .catch(err => {
                            console.log(`Error ${err}`);
                        })
                }

            })
            .catch(err => `Error happened when checking email: ${err}`);

    }









});

module.exports = router;