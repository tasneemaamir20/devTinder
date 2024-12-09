const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Hello world from server 4");
});

app.use("/", (req, res) => {
  res.send("Hello world from server 3");
});

app.use("/test", (req, res) => {
  res.send("Hello world from server");
});

app.use("/hello", (req, res) => {
  res.send("Hello world from server 2");
});

app.listen(3000, () => {
  console.log("server is running on port number 3000");
});
