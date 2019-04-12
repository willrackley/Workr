// Login logic to check users email and password
// If we have a match send user to his the main log in page
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require("../models");


module.exports = function(passport) {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		db.User.findOne({
				email: email
			}).then(user => {
			// If we don't find user by his email
			if (!user) {
				return done(null, false, {
					// Email doesn't exist in database
					message: 'Email address is incorrect!'
				});
			} else { // If we find user by email
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					// Check does users password match with record in database
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {
							// Password is incorrect
							message: 'Password is incorrect!'
						});
					}
				});
			}
		});
	}));
	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		db.User.findById(id, function(err, user) {
			loggedIn = {
				id: user.id,
				firstname: user.firstname,
				email: user.email,
				comments: user.comments
			}
				done(null, loggedIn);
		});		
	});

};