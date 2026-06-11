const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectMongo = await mongoose.connect(process.env.mongodb_url);
    console.log("Hi, MongoDB is now connected.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;