const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("Hello world from server 2");
// });
// ! dynamic routing , (\\d+) we can use this for only taking the number input
app.get("/user/:userId(\\d+)", (req, res) => {
  console.log(req.params);
  res.send("succefully run");
});
// ! dynamic routing
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Tasneem ", lastName: "Aamir" });
});

// ! GET method routing
app.get("/user", (req, res) => {
  res.send({ firstName: "Tasneem ", lastName: "Aamir" });
});
// ! POST method routing
app.post("/user", (req, res) => {
  res.send("POST Method called succesfully !!!");
});
// ! PATCH method routing
app.patch("/user", (req, res) => {
  res.send("PATCH Method called succesfully !!!");
});
// ! DELETE method routing
app.delete("/user", (req, res) => {
  res.send("DELETE Method called succesfully !!!");
});

app.listen(3000, () => {
  console.log("server is running on port number 3000");
});
