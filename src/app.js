const express = require("express");
const connectDB = require("./config/database");
const app = express();
const { userAuth } = require("./Middlewares/auth.js");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());
const bcrypt = require("bcrypt");
// ! POST API  to signup user
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

// ! GET API for getting profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// ! POST API for Sending Request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("Sending a conection request");

    res.send("Connection Request Send");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// ! find the user by id and delete it
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user = await User.findByIdAndDelete({_id : userId});
    //  OR
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(400).send("User not found");
    } else {
      res.send("User deleted succussfully!!");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// ! find the user by email and delete it
app.delete("/deleteUserByEmail", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOneAndDelete({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found ");
    } else {
      res.send("User deleted succesfully !!" + user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong !!!");
  }
});

//! update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every(k =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 5) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "After",
      runValidators: true,
    });
    res.send("Data update succesfully" + user);
  } catch (err) {
    res.status(400).send("Update Failed " + err);
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

//! get user by using id with method findById() method

// app.get("/userById", async (req, res) => {
//   const userId = req.body._id;

//   try {
//     const user = await User.findById({ _id: userId });
//     if (!user) {
//       res.send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //! get user by using id with method findById() method withut knowing the user id by providing the email to get the id
// app.get("/userById", async (req, res) => {
//   const userEmail = req.body.emailId;

//   const userByEmail = function userByEmail() {
//     try {
//       console.log(userEmail);
//       const user = User.findOne({ emailId: userEmail });
//       return user;
//     } catch (err) {
//       return err;
//     }
//   };
//   console.log(userByEmail());

//   try {
//     console.log(userId);
//     const user = await User.findById({ _id: userId });
//     if (!user) {
//       res.send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong 2");
//   }
// });
// ! get user with matching email using find() method by passing the email parameter in that ...

app.get("/allUser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("User not found");
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
    console.log("Database connection established successfully");
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
