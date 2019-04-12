const router = require("express").Router();
const usersController = require("../../controllers/jobsController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .delete(usersController.remove);

module.exports = router;
