const express = require('express');
const mongoose = require("mongoose");
const listing = require('../models/listting');
const ejsMate =require('ejs-mate');
const path = require('path');
const Listing = require('../models/listting');
const ExpressError = require("./custom_error");
const app = express();
const port = 3000;

app.listen(port,(req,res)=>{
  console.log("server is running 3000");
});

app.get("/",(req,res)=>{
    
    throw new ExpressError(404,"page not found"); 
});
function er(){
    throw new ExpressError(404,"page not found"); 
}
app.get("*" ,er);

app.use((err,req,res,next)=>{
    console.log("___error__"); 
    let {status,message}=err;
    res.status(status).send(message);
});


