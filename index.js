const express = require('express');
const mongoose = require("mongoose");
const listing = require('./models/listting');
const ejsMate =require('ejs-mate');
const path = require('path');
const Listing = require('./models/listting');    /*  */
const ExpressError = require('./erorr-handling/custom_error')

const app = express();
const port = 8080;

app.listen(port,()=>{console.log(`server is running at ${port}`);});
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);


main()
.then(()=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log("db error:",err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/major");
}
function isObjectComplete(obj) {
    for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
            return false;
        }
    }
    return true;
}

function wrapasync(fn){
   return function (req,res,next){
    fn(req,res,next).catch((err)=>next(err));
   }
}
app.get('/listing',async(req,res)=>{
    let allListing = await listing.find({});
    res.render('listings/listings.ejs',{allListing});
})

app.get('/listing/new',(req,res)=>{
   res.render('listings/new.ejs');
})

app.get('/listing/:id/edit',async(req,res)=>{
    let data = await listing.findById(req.params.id);
    res.render('listings/edit.ejs',{data});
})

app.post('/listing/:id/edit',async(req,res)=>{
    let x = req.body.listings;
     if(isObjectComplete(x)){
         let updated = await listing.findByIdAndUpdate(req.params.id,x);
         console.log("data is updated");
         await updated.save();
         res.redirect('/listing');
        }
      else{
         res.redirect('/listing');
      }   
})

app.get('/listing/:id',async(req ,res)=>{
 let {id} = req.params;
 let obj = await listing.find({_id:id});
 res.render('listings/show.ejs',{obj});
})
app.post('/listing',async(req,res,next)=>{
    let x =req.body.listings;
    try{
        let newlisting=new listing(x);
        await newlisting.save();
        res.redirect('/listing');
        
    }
    catch(err){
       next( new ExpressError(400,"please fill complete form")); 
    }
});
app.use((err,req,res,next)=>{
   res.render('listings/Error.ejs',{err});
});
