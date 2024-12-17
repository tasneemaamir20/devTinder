const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://aamirtasneem2:HC6osSRpopbwQ44o@learningnode.g34zy.mongodb.net/devTinder"
  );
};


module.exports = connectDB;

