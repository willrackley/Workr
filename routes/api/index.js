const router = require("express").Router();
const jobsRoutes = require("./jobs");
const usersRoutes = require("./users");
const messagesRoutes = require("./messages");



router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);
router.use("/messages", messagesRoutes);


module.exports = router;
