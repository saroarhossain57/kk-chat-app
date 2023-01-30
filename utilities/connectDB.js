const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

module.exports = connectDB;