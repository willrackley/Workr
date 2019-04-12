const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String },
  password: {type: String, required: true},
  email: {type: String, required: true},
  bio: String,
  rating: { type: String },
  profileImage: { type: String },
  signupDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;