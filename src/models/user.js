const mongoose = require("mongoose");
const express = require("express");

const { Schema } = require("mongoose");
var validator = require("validator");
const app = express();

app.use(express.json());

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 18,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Password !!!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 35,
      validate(value) {
        if (
          // !validator.isInt(value, { min: 18, max: 40 }) &&
          !validator.isNumeric(value)
        ) {
          throw new Error("Age is Invalid");
        }
      },
    },
    gender: {
      type: String,
      trim: true,
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
      maxLength: 100,
      validate(value) {
        if (!validator.isLength(value, { min: 0, max: 200 })) {
          throw new Error("Minimize the About section");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
