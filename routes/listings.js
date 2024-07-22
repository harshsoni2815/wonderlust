if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express = require('express');
const { isloggedin,isowner ,validateListing,wrapasync} = require('../middleware.js');
const { index, sortlisting, newListingform, newListingpost, editform, editpost, showlist, destroyList } = require('../controller/listingcontroller.js');
const multer  = require('multer')
const {storage} = require("../cloud_config.js");
const upload = multer({ storage});
const router = express.Router();
//home page and new
router.route("/")
.get(index)
.post( isloggedin,/*  validateListing, */upload.single("listings[image]"), wrapasync(newListingpost));


router.get("/Sort", wrapasync(sortlisting));


//new listing form
router.get('/new', isloggedin, newListingform);

//UPDATING form and updating
router.route("/:id/edit")
.get( isloggedin,wrapasync(editform))
.post(isowner, validateListing, wrapasync(editpost));


//showing list and deleting list
router.route("/:id")
.get( wrapasync(showlist))
.delete( isloggedin,wrapasync(destroyList));

module.exports = router;
