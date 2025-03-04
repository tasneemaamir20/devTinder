const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender about skills";
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "photourl",
      "about",
    ]);

    res.json({
      message: "Data fetched Succesfully !!!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).json("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map(row => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = userRouter;
