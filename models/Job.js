const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  posterId: { type: String, required: true },
  posterName: { type: String, required: true },
  posterEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  jobImage: { type: String, default: null },
  category: { type: String, required: true },
  offer: { type: String, required: true },
  status: {type: String, default: "incomplete", required: true},
  seekerId: {type: String, default: null },
  seekerName: {type: String, default: null },
  postedDate: { type: Date, default: Date.now},
  completionDate: { type: Date, default: null }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;