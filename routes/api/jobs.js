const router = require("express").Router();
const jobsController = require("../../controllers/jobsController");

// Matches with "/api/jobs"
router.route("/")
  .get(jobsController.findAll)
  .post(jobsController.create);

// Matches with "/api/jobs/:id"
router.route("/:posterId")
  .get(jobsController.findById)

router.route("/:id")
  .delete(jobsController.remove);


router.route("/uploadImg")
  .post(jobsController.uploadImg)
  
module.exports = router;
