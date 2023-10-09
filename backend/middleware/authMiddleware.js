const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to protect routes by checking for a valid JWT in the Authorization header
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const secretKey = "defaultsecret";
      const decoded = jwt.verify(token, secretKey);

      // Retrieve the user associated with the decoded token, excluding the password
      req.user = await User.findById(decoded.id).select("-password");

      // If the user is not found, return an error
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      // If everything is valid, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  // If no valid token is found, return an error
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
