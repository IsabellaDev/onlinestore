const isAdmin = (req,res,next)=>{
    if(req.session.userInfo.type=="admin"){
        next();
    }

    else {
        res.render("User/userDashboard");
    }
}

module.exports = isAdmin;