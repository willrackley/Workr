const db = require("../models");

//methods for jobsController
module.exports = {
  
  findAll: function(req, res) {
    db.Job
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    let {
        //posterId,
        title,
        description,
        city,
        jobImage,
        category,
        status,
        seekerId,
        postedDate,
        completionDate
      } = req.body;
    db.Job
      .create({
        posterId: "will",
        title: title,
        description: description,
        city: city,
        jobImage: jobImage,
        category: category,
        status: status,
        seekerId: seekerId,
        postedDate: postedDate,
        completionDate: completionDate
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      
  },
  remove: function(req, res) {
    db.Job
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
