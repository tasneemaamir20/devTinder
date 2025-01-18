const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
cookieParser();
const userAuth = async (req, res, next) => {
  try {
    //  read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "Aamir@Dev$123");

    //  validate the token
    const { _id } = decodedObj;
    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR auth :" + err.message);
  }
};
module.exports = { userAuth };
