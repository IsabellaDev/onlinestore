const isAuthenticated = (req,res,next)=>{
    if(req.session.userInfo){
        next();
    }

    else {
        res.redirect("/user");
    }
}

module.exports = isAuthenticated;