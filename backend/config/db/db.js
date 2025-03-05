const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully..");
  } catch (err) {
    console.log(`error : ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
