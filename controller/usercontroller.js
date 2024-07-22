const User = require('../models/user.js');
module.exports.singup = (req,res)=>{
    res.render('./user/singup.ejs');
}
module.exports.singInPost=async(req,res,next)=>{
    let x={username,email,password}=req.body;
    let newUser=new User({
        username:username,
        email:email
    });
    try{
        let result =await User.register(newUser,password);

        req.login(newUser,(err)=>{
            if(err){
                
                next(err);
            }
            req.flash("success","thank for joining with us");
            res.redirect("/listing");
        });
    }
    catch(err){
        req.flash("error","user already exisit");
        res.redirect("/user");
    }
}
module.exports.logOut =(req,res,next)=>{
    req.logout((err)=>{
     if(err){
        return  next(err);
     }
     req.flash("success","you have logged out");
     res.redirect("/listing");
    });
 }
 module.exports.logIn= (req,res)=>{
    console.log(res.locals.redirecturl);
      req.flash("success","welcome to wonderlust");
     
   res.redirect(res.locals.redirecturl);

}