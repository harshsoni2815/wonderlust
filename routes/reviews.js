const express = require('express');
const router = express.Router({mergeParams:true});
const {ReviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const listing = require('../models/listting'); 
const { listingSchema } = require('../schema.js'); 
const ExpressError = require('../erorr-handling/custom_error');
const {wrapasync} = require('../utility/util.js');


// post review
router.post("/",wrapasync(async(req,res,next)=>{ 
    let result=ReviewSchema.validate(req.body);
    let {id} = req.params;
    if(result.error){
     next(new ExpressError(400,result.error.message));
    }
    let new_review = new Review(req.body.review);
    await  new_review.save();
    let list = await listing.findById(req.params.id);
    list.review.push(new_review);
    await list.save();
    res.redirect(`/listing/${id}`);
 
 }));
 //delet
 router.delete("/:reviewid",wrapasync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
}))
module.exports = router;
