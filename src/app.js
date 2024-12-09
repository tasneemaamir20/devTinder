const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("Hello world from server 2");
// });

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Tasneem ", lastName: "Aamir" });
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Tasneem ", lastName: "Aamir" });
});
app.post("/user", (req, res) => {
  res.send("POST Method called succesfully !!!");
});
app.patch("/user", (req, res) => {
  res.send("PATCH Method called succesfully !!!");
});
app.delete("/user", (req, res) => {
  res.send("DELETE Method called succesfully !!!");
});

app.listen(3000, () => {
  console.log("server is running on port number 3000");
});
