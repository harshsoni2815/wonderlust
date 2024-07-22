const mongoose = require('mongoose');
const Review = require('./review.js');
const { ref } = require('joi');
const Schema = mongoose.Schema;

let listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    url: String,
   filename:String
  },

  price: Number,
  location: String,
  country: String,
  review: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  }

});

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    console.log("inside post function");
    await Review.deleteMany({
      _id: { $in: doc.review }
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
