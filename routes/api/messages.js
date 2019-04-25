const router = require("express").Router();
const messagesController = require("../../controllers/messagesController");

// Matches with "/api/messages"
router.route("/")
  .get(messagesController.findAll)
  .post(messagesController.create);

module.exports = router;