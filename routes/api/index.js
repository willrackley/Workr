const router = require("express").Router();
const jobsRoutes = require("./jobs");
const usersRoutes = require("./users");

// Book routes
router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
