const router = require("express").Router();
const usersController = require("../../controllers/usersController");
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

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
  passport.authenticate('local', function (error, user, info) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    console.log(error);
    console.log(user);
    console.log(info);

    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      next();
    }
    res.status(401).send(info);
  })(req, res)
},
// function to call once successfully authenticated
function (req, res) {
  
  res.status(200).send("logged in!");
});

router.route('/logout')
.get(function(req, res) {
	req.logout();
	req.flash('success_msg', 'You are successfully logged out');
	res.redirect('/login');
});


module.exports = router;
