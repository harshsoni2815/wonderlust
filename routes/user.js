const express = require('express');

const {wrapasync} = require('../middleware.js');
const User = require('../models/user.js');
const passport = require('passport');
const router = express.Router();
const {saveredirect} = require('../middleware.js');
const { singup, singInPost, logOut, logIn } = require('../controller/usercontroller.js');



router.get('/',singup);

router.post('/singup',wrapasync(singInPost));

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
})  
router.post("/logout",logOut);

router.post("/login",saveredirect,passport.authenticate("local", {
    failureRedirect: "/user/login", 
    failureFlash:true
}),logIn)
module.exports = router;