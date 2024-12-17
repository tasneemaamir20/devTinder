const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User=mongoose.model("User", userSchema);

module.exports = User;