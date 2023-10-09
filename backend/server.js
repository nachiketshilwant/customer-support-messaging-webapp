// Import required modules
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

// Set the port number, use the environment variable PORT if available, otherwise default to 5000
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming form data
app.use(express.urlencoded({ extended: false }));

// Define a simple route for the root path
app.get("/api/users", (req, res) => {
  res.status(200).json({ message: "Welcome to the api" });
});

// Define routes for user and ticket APIs
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));