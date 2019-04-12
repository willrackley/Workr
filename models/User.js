const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, default: "null"},
  firstname: { type: String, required: true },
  lastname: { type: String, default: "null" },
  password: {
    type: String,
    required: true,
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  bio: { type: String, default: "null"},
  rating: { type: String, default: "null" },
  profileImage: { type: String, default: "null" },
  signupDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;