const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .delete(usersController.remove);

  router.route("/sign-up")
  .post(usersController.create);

module.exports = router;
