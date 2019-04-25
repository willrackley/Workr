const db = require("../models");

module.exports = {
  
    findAll: function(req, res) {
      db.Message
        .find(req.query)
        .sort({ postedDate: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.Message
        .find({ posterId: req.params.posterId })
        .sort({ postedDate: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      let {
          recieverId,
          senderId,
          messageBody,
          jobTitle,
          date
        } = req.body;
      db.Message
        .create({
            recieverId: recieverId,
            senderId: senderId,
            messageBody: messageBody,
            jobTitle: jobTitle,
            date: date
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
        
    },
    remove: function(req, res) {
      db.Message
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        // .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}