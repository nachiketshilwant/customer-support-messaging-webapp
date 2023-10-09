// Import the required modules
const express = require("express");
const router = express.Router();
const {
  registerUserCustomer,
  registerUserAgent,
  loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Define routes for user-related operations

// Route for customer registration
router.post("/registercustomer", registerUserCustomer);

// Route for agent registration
router.post("/registeragent", registerUserAgent);

// Route for user login
router.post("/login", loginUser);

// Export the router to be used in other parts of the application
module.exports = router;