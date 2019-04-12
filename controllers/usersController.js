const db = require("../models");

//methods for usersController
module.exports = {
  
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.find({
      apiId: req.body.apiId
    },function(err, data) {
      // Log any errors if the server encounters one
      if (err) {
        console.log(err);
      }
      //checks to see if book is already in the database
      //if it isnt then we add it
      if (data.length === 0) {
        db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      }
      if (data.length !== 0) {
        res.end();
      }
    });
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
