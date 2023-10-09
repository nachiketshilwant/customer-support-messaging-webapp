const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to establish a connection to the MongoDB database
    // const conn = await mongoose.connect(process.env.URL);
    const conn = await mongoose.connect(
      "mongodb+srv://Hack123123:Hack12321@cluster0.dj27epj.mongodb.net/?retryWrites=true&w=majority"
    );

    // Log a message if the connection is successful
    console.log(`MongoDB Connected`);
  } catch (error) {
    // Log an error message and exit the process if the connection fails
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
