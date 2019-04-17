const router = require("express").Router();
const jobsRoutes = require("./jobs");
const usersRoutes = require("./users");



router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);


module.exports = router;
