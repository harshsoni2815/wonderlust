const mongoose = require('mongoose');
const listings = require('../models/listting.js');
const data = require('./data');
let dburl = process.env.ATLSDB

main()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
console.log(err);
});
async function main(){
 await mongoose.connect(dburl);
}

async function initdb(){
    data.data=data.data.map((obj)=>({...obj,owner:'669e4c3d15af2b08572eb032'}));
    await listings.insertMany(data.data);
    console.log("inserted all sample data");
    mongoose.disconnect();
}
initdb();
