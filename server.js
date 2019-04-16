const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require('passport');
//const flash = require('connect-flash');


const PORT = process.env.PORT || 4000;

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workr";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
  }


// Passport
app.use(passport.initialize());

// Setting up flash messages
//app.use(flash());

// Global variables
// app.use(function(req, res, next) {
// 	res.locals.success_msg = req.flash('success_msg');
// 	res.locals.error_msg = req.flash('error_msg');
// 	res.locals.error = req.flash('error');
// 	next();
// });


// Setting up templates 
app.set('view engine', 'ejs');

// Passport config
require('./config/passport')(passport);

// Add routes, both API and view
app.use(routes);

//routes
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/email", require("./routes/api/email"));


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
