const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  //posterId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  jobImage: { type: String, default: null },
  category: { type: String, required: true },
  status: {type: String, default: "incomplete", required: true},
  seekerId: {type: String, default: null },
  postedDate: { type: Date, default: Date.now },
  completionDate: { type: Date, default: null }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;