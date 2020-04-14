const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const registrationSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated:{
        type:Date,
        defualt:Date.now()
    },
    type: {
        type: String,
        default:"customer"
    }

});

registrationSchema.pre("save",function(next){

    bcrypt.genSalt(12)
    .then((salt)=>{
        bcrypt.hash(this.password,salt)
        .then((encryptPwd)=>{
            this.password=encryptPwd;
            next();
        })
        .catch(err=>console.log(`Error occured when hashing: ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting: ${err}`));

});

module.exports.emailCheck=function(emailInput){
    return new Promise((resolve, reject)=>{

        registration.findOne({email:emailInput})
        .then(()=>{
            reject("The email has already been registered!!");
        })
    });
};



//pass the schema to model
const registration=mongoose.model('customerRegistration', registrationSchema);


module.exports=registration;