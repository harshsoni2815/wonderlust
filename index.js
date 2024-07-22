const express = require('express');
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const path = require('path');   /*  */
const ExpressError = require('./erorr-handling/custom_error');
const methodOverride = require("method-override");
const listings = require('./routes/listings.js');
const reviews = require('./routes/reviews.js');
const session = require('express-session');
const flash  = require('connect-flash');
const passport = require('passport');
const localstat = require('passport-local');
const User = require('./models/user.js');
const userRout = require('./routes/user.js');
const MongoStore = require('connect-mongo');

const app = express();
const port = 8080;
const dburl = process.env.ATLSDB;

const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})
const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser=req.user; 
    next();
})

app.set("view engine", "ejs");

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use("/listing", listings);
app.use("/listing/:id/review", reviews);
app.use("/user",userRout);


main()
    .then(() => {
        console.log("connected successfully");
    })
    .catch((err) => {
        console.log("db error:", err);
    })

async function main() {
    await mongoose.connect(dburl);
}


app.get('*', (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})
app.use((err, req, res, next) => {
    res.status(err.status||200).render('listings/Error.ejs', { err });
});
app.listen(port, () => { console.log(`server is running at ${port}`); });
