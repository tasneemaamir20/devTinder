const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../src/Middlewares/auth.js");
const User = require("../src/models/user");
const { validateEditProfileData } = require("../src/utils/validation.js");
const bcrypt = require("bcrypt");

// ! GET API for getting profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  console.log(validateEditProfileData(req));
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Profile Update Succesfull`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR profile : " + err.message);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const newPassword = req.user;
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    newPassword.password = passwordHash;
    await newPassword.save();
    res.json({
      message: `password Changed Successfull !!!`,
      data: newPassword,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
