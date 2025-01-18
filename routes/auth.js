const express = require("express");

const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../src/models/user");
const { validateSignUpData } = require("../src/utils/validation");
const { userAuth } = require("../src/Middlewares/auth");

// ! POST API  to signup user
authRouter.post("/signup", async (req, res) => {
  try {
    //! validation of data
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      skills,
      about,
      photoUrl,
    } = req.body;
    //! Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      skills,
      about,
      photoUrl,
    });

    await user.save();
    res.send("data added succesfully");
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
});

// ! POST API for login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credential!!!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create the JWT token
      const token = await user.getJWT();

      // Send back the JWT token with cookies with the response
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("Login Succesfull!!");
    } else {
      res.send("Invalid credential!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//! API for logout
authRouter.post("/logout", userAuth, async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfull");
});
module.exports = authRouter;
