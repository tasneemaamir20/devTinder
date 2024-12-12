const express = require("express");

const app = express();
// const { adminAuth,userAuth } = require("./Middlewares/auth.js");


// ? Error handling using try catch
app.use("/getUserData", (req, res) => {
  // try {
  throw new Error("rewqe");
  res.send("User Data send");
  // } catch (err) {
  //   res.status(500).send("Something went wrong 2");
  // }
});

// ? Error handling using middleware
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
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

app.listen(3000, () => {
  console.log("server is running on port number 3000");
});
