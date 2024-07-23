const listing = require("../models/listting.js");
module.exports.index= async (req, res) => {
    let allListing = await listing.find({});
    res.render('listings/listings.ejs', { allListing });
}

module.exports.sortlisting=async (req, res) => {
    let allListing = await listing.find().sort({ price: 1 });
    res.render('listings/listings.ejs', { allListing });
}
module.exports.newListingform=(req, res) => {
    res.render('listings/new.ejs');
}
module.exports.newListingpost =async (req, res, next) => {
   let {path ,filename} = req.file;
   console.log(req.file);
   const newlisting = new listing(req.body.listings);
    newlisting.owner = req.user._id;
    newlisting.image.url = path;
    newlisting.image.filename=filename; 
    console.log("NNNNN:",newlisting);
    await newlisting.save();
    req.flash("success", "New listing is added");
    res.redirect('/listing') ; 
}

module.exports.editform=async (req, res) => {
    let data = await listing.findById(req.params.id);
    res.render('listings/edit.ejs', { data });
}
module.exports.editpost=async (req, res) => {
    let x = req.body.listings;
    let temp = await listing.findById(req.params.id);
    let updated = await listing.findByIdAndUpdate(req.params.id, { ...x });
    console.log("data is updated");
    await updated.save();
    res.redirect('/listing');

}
module.exports.showlist=async (req, res) => {
    let { id } = req.params;
    let obj = await listing.find({ _id: id })
    .populate({path:"review"
        ,populate:{path:"author"}})
        .populate('owner');
       
   
    res.render('listings/show.ejs', { obj });
}
module.exports.destroyList = async (req, res, next) => {
    let id = req.params.id;
    let result = await listing.findByIdAndDelete(id);
    res.redirect('/listing');
}