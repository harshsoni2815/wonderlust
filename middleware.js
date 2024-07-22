const Listing = require("./models/listting");
const ExpressError = require("./erorr-handling/custom_error")
const { listingSchema } = require('./schema.js'); 
const review = require("./models/review.js");

module.exports.isloggedin = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.originalurl =req.originalUrl;
        req.flash("success","login to use");
        return res.redirect("/user/login");
    }
    else{
       next();
    }
}

module.exports.saveredirect = (req,res,next)=>{
  if(req.session.originalurl){
    res.locals.redirecturl =  req.session.originalurl; 
  }
  else{
    res.locals.redirecturl ="/listing";
  }
  next();
}
module.exports.isowner = async(req,res,next)=>{
  let {id} = req.params;
  let list =await Listing.findById(id);
  if(!list.owner._id.equals(res.locals.curruser._id)){
    req.flash("error", "you don't have permission to edit");
    return res.redirect("/listing")
  }
  next();
}
module.exports.validateListing = (req,res,next)=>{

  let {error} =listingSchema.validate(req.body);

  if(error){
     throw new ExpressError(400,"bad request "+error.message);
  } 
  else{
      next();
  }
}
module.exports.wrapasync=function (fn) {
  return function (req, res, next) {
      fn(req, res, next).catch((err) => next(new ExpressError(400,err.message)));
  }
}
module.exports.isauthor=async(req,res,next)=>{
  let {id,reviewid} = req.params;
  let rid=await review.findById(reviewid);
  if(!rid.author.equals(res.locals.curruser._id)){
    req.flash("error","! you can not delet other user review")
    return res.redirect(`/listing/${id}`);
  }
  next()
}