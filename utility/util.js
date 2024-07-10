const { listingSchema } = require('../schema.js'); 
const ExpressError = require('../erorr-handling/custom_error');
function wrapasync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(new ExpressError(400,err.message)));
    }
}
const validateListing = (req,res,next)=>{

    let {error} =listingSchema.validate(req.body);

    if(error){
       throw new ExpressError(400,"bad request "+error.message);
    } 
    else{
        next();
    }
}
module.exports = {
    wrapasync,
    validateListing
};