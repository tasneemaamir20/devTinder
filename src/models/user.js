const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
    default: "https://images.app.goo.gl/4Ucf977mAx2nDMiC9",
  },
  about: {
    type: String,
    default: "This is the default String using default feature",
  },
  skills: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
