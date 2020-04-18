const productModel=require("../models/product");


const dashboardLoader = (req,res)=>{
    if(req.session.userInfo.type=="admin"){
        productModel.find()
        .then((products)=>{
            const pro=products.map(product=>{
                return {
                    id: product._id,
                    name: product.name,
                    src: product.src,
                    desc: product.desc,
                    price: product.price
                }
            });
            res.render("User/adminDashboard", {
                products:pro
            });
        })
    }

    else {
        res.render("User/userDashboard");
    }
}

module.exports = dashboardLoader;