const dashboardLoader = (req,res)=>{
    if(req.session.userInfo.type=="admin"){
        res.render("User/adminDashboard");
    }

    else {
        res.render("User/userDashboard");
    }
}

module.exports = dashboardLoader;