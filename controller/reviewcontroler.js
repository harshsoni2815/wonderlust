const Review = require('../models/review.js');
const listing = require('../models/listting'); 
const {ReviewSchema} = require('../schema.js');
const ExpressError = require('../erorr-handling/custom_error');

module.exports.postreview=async(req,res,next)=>{ 
    let result=ReviewSchema.validate(req.body);
    if(result.error){
        next(new ExpressError(400,result.error.message));
    }
    let {id} = req.params;
    let new_review = new Review(req.body.review);
    new_review.author = res.locals.curruser;
    await  new_review.save();
    let list = await listing.findById(req.params.id);
    list.review.push(new_review);
    await list.save();
    res.redirect(`/listing/${id}`);
 
 }
 module.exports.testing=async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
}