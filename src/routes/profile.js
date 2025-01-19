const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth.js");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation.js");
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
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    LoggedInUser.password = await bcrypt.hash(req.body.password, 10);
    await LoggedInUser.save();
    res.json({
      message: `password Changed Successfull !!!`,
      data: LoggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
