const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../src/Middlewares/auth.js");
const User = require("../src/models/user");

// ! GET API for getting profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
