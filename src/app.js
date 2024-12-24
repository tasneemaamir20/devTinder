const express = require("express");
const connectDB = require("./config/database");
const app = express();
//! const { adminAuth,userAuth } = require("./Middlewares/auth.js");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("data added succesfully");
  } catch (err) {
    res.status(500).send("Data not added");
  }
});

//! get user by email using findOne() method
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong 2");
  }
});

// ! get user with matching email using find() method by passing the email parameter in that ... 

app.get("/allUser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("User not found")
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
//! Feed API - GET /feed - get all the users from the database using find()  method
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection esrtablished successfully");
    app.listen(3000, () => {
      console.log("server is running on port number 3000");
    });
  })
  .catch(() => {
    console.log("Database is not connected succussfull!!!!");
  });

// ? Error handling using try catch
// app.use("/getUserData", (req, res) => {
//   // try {
//   throw new Error("rewqe");
//   res.send("User Data send");
// } catch (err) {
//   res.status(500).send("Something went wrong 2");
// }
// });

// ? Error handling using middleware
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
// });
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data Sent");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user");
// });

// app.get("/user/showData", userAuth,(req, res) => {
//   res.send("Showing the  user data ");
// });

// app.get("/admin/login", (req, res) => {
//   res.send("Logged in user");
// });

// app.get("/admin/signup", (req, res) => {
//   res.send("SignedUp user");
// });
// ? Middleware and request handler
// ! using multiple route handler
// app.use("/", (req, res, next) => {
//   console.log("Handling the reponse 1 !!!");
//   next();
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("handling the respons 2 !!");
//     next();
//   },
//   (req, res) => {
//     console.log("handling the response 3!!!");
//     res.send("Respond !!!");
//   }
// );

// ? using multiple route handler
// ! using of next()
// app.use(
//   "/user",
//   (req, res, next) => {
//     // res.send("Hello world from server 2");
//     console.log("Respond 1");
//     next();
//     console.log("You are still here");
//   },
//   (req, res) => {
//     res.send("hello 2");
//     console.log("Respond 2");
//   }
// );
// ? using multiple route handler
// ! using of return next()
// app.use(
//   "/user",
//   (req, res, next) => {
//     // res.send("Hello world from server 2");
//     console.log("Respond 1");
//     return next();
//     console.log("You are still here");
//   },
//   (req, res) => {
//     res.send("hello 2");
//     console.log("Respond 2");
//   }
// );
// ! dynamic routing , (\\d+) we can use this for only taking the number input
// app.get("/user/:userId(\\d+)", (req, res) => {
//   console.log(req.params);
//   res.send("succefully run");
// });
// ! dynamic routing
// app.get("/user/:userId/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Tasneem ", lastName: "Aamir" });
// });

// ! GET method routing
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Tasneem ", lastName: "Aamir" });
// });
// ! POST method routing
// app.post("/user", (req, res) => {
//   res.send("POST Method called succesfully !!!");
// });
// ! PATCH method routing
// app.patch("/user", (req, res) => {
//   res.send("PATCH Method called succesfully !!!");
// });
// ! DELETE method routing
// app.delete("/user", (req, res) => {
//   res.send("DELETE Method called succesfully !!!");
// });
