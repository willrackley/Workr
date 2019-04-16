const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const jwtSecret = require("../../config/jwtConfig");
const jwt = require("jsonwebtoken");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
  .delete(usersController.remove);

router.route("/sign-up")
.post(usersController.create);

router.route("/login")
.post(
  function (req, res, next) {
  // call passport authentication passing the "local" strategy name and a callback function
  passport.authenticate('local', {session: false}, function (error, user, info) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    // console.log(error);
    // console.log(user);
    // console.log(info);

    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
     req.login(user, {session: false}, (err) => {
       if (err) {
         res.send(err);
       }
       const payload = {id: user._id}
       const token = jwt.sign(payload, jwtSecret.secret, { expiresIn: 2592000});
       return res.json({ token })
     });
    }
    
  })(req, res)
},
// function to call once successfully authenticated
function (req, res) {
  console.log()
  res.status(200).send("logged in!");
});

router.get("/find" , passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = {id: req.user._id, email: req.user.email, firstname: req.user.firstname, username: req.user.username, rating: req.user.rating, bio: req.user.bio, signUpDate: req.user.signupDate, profileImage: req.user.profileImage}
    res.send(user)
  })

router.route('/logout')
.get(function(req, res) {
	req.logout();
	//req.flash('success_msg', 'You are successfully logged out');
	res.redirect('/login');
});


module.exports = router;
