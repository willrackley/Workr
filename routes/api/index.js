const router = require("express").Router();
const jobsRoutes = require("./jobs");
const usersRoutes = require("./users");
const emailRoutes = require("./email");



router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);
router.use("/email", emailRoutes);

module.exports = router;
