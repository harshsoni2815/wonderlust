const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;

let listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image:{
    type: String,
    default: "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  price: Number,
  location: String,
  country: String,
  review: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
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
