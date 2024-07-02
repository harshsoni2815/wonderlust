const mongoose = require('mongoose');
const listings = require('../models/listting.js');
const data = require('./data');

main()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
console.log(err);
});
async function main(){
 await mongoose.connect("mongodb://127.0.0.1:27017/major");
}

async function initdb(){
    await listings.insertMany(data.data);
    console.log("inserted all sample data");
    mongoose.disconnect();
}
initdb();
