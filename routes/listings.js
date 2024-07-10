const express = require('express');
const mongoose = require("mongoose");
const listing = require('../models/listting'); 
const ExpressError = require('../erorr-handling/custom_error')
const { listingSchema } = require('../schema.js'); 
const {wrapasync ,validateListing} = require('../utility/util.js');

const router = express.Router();


//home page
router.get('/', async (req, res) => {
    let allListing = await listing.find({});
    res.render('listings/listings.ejs', { allListing });
})
router.get("/Sort",wrapasync(async(req,res)=>{
    let allListing = await listing.find().sort({price:1});
    res.render('listings/listings.ejs', { allListing });
   }));


//new listing
router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
})
router.post('/', validateListing,wrapasync(async (req, res, next) => {
   
    console.log(req.body.listings);
    const newlisting = new listing(req.body.listings);
    await newlisting.save();
    res.redirect('/listing');
}))

//UPDATING
router.get('/:id/edit', async (req, res) => {
    let data = await listing.findById(req.params.id);
    res.render('listings/edit.ejs', { data });
})
router.post('/:id/edit', validateListing,wrapasync(async (req, res) => {
    let x = req.body.listings;

    let updated = await listing.findByIdAndUpdate(req.params.id, x);
    console.log("data is updated");
    await updated.save();
    res.redirect('/listing');

}))
//SHOWING
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let obj = await listing.find({ _id: id }).populate('review');
    res.render('listings/show.ejs', { obj });
})

//DELETING
router.delete("/:id",async(req,res,next)=>{
    let id = req.params.id;
    let result =await listing.findByIdAndDelete(id);
    res.redirect('/listing');
  })



 module.exports = router;
