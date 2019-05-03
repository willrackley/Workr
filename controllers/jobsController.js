const db = require("../models");

//methods for jobsController
module.exports = {
  
  findAll: function(req, res) {
    db.Job
      .find(req.query)
      .sort({ postedDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Job
      .find({ posterId: req.params.posterId })
      .sort({ postedDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findWorkedJobs: function(req, res) {
    db.Job
      .find({ acceptedBy: req.params.acceptedBy })
      .sort({ postedDate: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    let {
        posterId,
        posterName,
        posterEmail,
        title,
        description,
        city,
        state,
        jobImage,
        category,
        offer,
        status,
        seekerRated,
        posterRated,
        postedDate,
        completionDate
      } = req.body;
    db.Job
      .create({
        posterId: posterId,
        posterName: posterName,
        posterEmail: posterEmail,
        posterRated: posterRated,
        title: title,
        description: description,
        city: city,
        state: state,
        jobImage: jobImage,
        category: category,
        offer: offer,
        status: status,
        seekerRated: seekerRated,
        postedDate: postedDate,
        completionDate: completionDate
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      
  },
  remove: function(req, res) {
    db.Job
      .findById({ _id: req.params.id })
      .then(dbModel => {{
        res.json(dbModel)
        dbModel.remove()}})
      // .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateCompleted: function(req, res) {
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, {$set: {status: "completed", completionDate: Date.now()}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateIncomplete: function(req, res) {
    console.log(req.params)
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, {$set: {status: "incomplete", completionDate: null}, seekerRated: false, posterRated: false})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateAcceptJob: function(req, res) {
    console.log(req.body)
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, {$set: {acceptedBy: req.body.user, seekerName: req.body.name}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateRatingBool: function(req, res) {
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, {seekerRated: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateWorkrRatingBool: function(req, res) {
    db.Job
      .findOneAndUpdate({ _id: req.params.id }, {posterRated: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  uploadImg: function(req, res, next) {
    
    let newImage = {
      imageName: req.body.imageName,
      imageData: req.body.imageData
    }

    db.Image.create(newImage)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
};
