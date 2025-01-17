const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../src/Middlewares/auth.js");
const User = require("../src/models/user");

// ! POST API for Sending Request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("Sending a conection request");

    res.send("Connection Request Send");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = requestRouter;
