const express = require('express');
const router = express.Router({mergeParams:true});



const {isloggedin,wrapasync,isauthor} = require('../middleware.js');
const { postreview, testing } = require('../controller/reviewcontroler.js');

// post review
router.post("/",isloggedin,wrapasync(postreview));
 //delet
 router.delete("/:reviewid",isloggedin,isauthor,wrapasync(testing));
module.exports = router;
