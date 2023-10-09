const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register User Customer
const registerUserCustomer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation: Check if all required fields are included
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Must include all fields");
  }

  // Check if the user with the same email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new User
  const user = await User.create({
    name,
    email,
    password,
  });

  // If the user is successfully created, return user data and a JWT token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAgent: user.isAgent,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// Register User Agent
const registerUserAgent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation: Check if all required fields are included
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Must include all fields");
  }

  // Check if the user with the same email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new User with isAgent set to true
  const user = await User.create({
    name,
    email,
    password,
    isAgent: true,
  });

  // If the user is successfully created, return user data and a JWT token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAgent: user.isAgent,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ email });

  // Check if the user and password match
  if (user && password == user.password) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAgent: user.isAgent,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Get user information
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, "defaultsecret", {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUserCustomer,
  registerUserAgent,
  loginUser,
  getMe,
};
