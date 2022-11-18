const mongoose = require("mongoose");
const db=require('dotenv')
db.config();
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
    });
    console.log("mongoDB Connected");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;