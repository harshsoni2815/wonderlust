const express = require('express');
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const path = require('path');   /*  */
const ExpressError = require('./erorr-handling/custom_error');
const methodOverride = require("method-override");
const listings = require('./routes/listings.js');
const reviews = require('./routes/reviews.js');

const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use("/listing", listings);
app.use("/listing/:id/review", reviews);

main()
    .then(() => {
        console.log("connected successfully");
    })
    .catch((err) => {
        console.log("db error:", err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/major");
}

app.get('*', (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})
app.use((err, req, res, next) => {
    res.status(err.status).render('listings/Error.ejs', { err });
});
app.listen(port, () => { console.log(`server is running at ${port}`); });
