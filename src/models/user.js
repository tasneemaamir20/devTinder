const mongoose = require("mongoose");
const express = require("express");

const { Schema } = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        if (
          // !validator.isEmail(value) &&
          // !validator.isLowercase(value) &&
          !validator.matches(
            value,
            "^[a-zA-Z0-9](.?[a-zA-Z0-9]){5,29}@gmail.com$"
          )
        ) {
          throw new Error("Invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Password !!!");
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (
          !validator.isInt(value, { min: 18, max: 40 }) &&
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
      validate(value) {
        if (!validator.isLength(value, { min: 0, max: 500 })) {
          throw new Error("Minimize the About section");
        }
      },
    },
    skills: {
      type: [String],
      // validate(value) {
      //   if (!(value.length <= 5 && value.length >= 1)) {
      //     throw new Error("Insert atleast 1 Skills or Maximum 5");
      //   }
      // },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    {
      _id: user._id,
    },
    "Aamir@Dev$123",
    { expiresIn: "7d" }
  );
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
