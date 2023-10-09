const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// Get all tickets for a user
const getTicketsUser = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find tickets associated with the user
  const tickets = await Ticket.find({ user: user });
  res.status(200).json(tickets);
});

// Get all tickets for an agent
const getTicketsAgent = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find all tickets
  const tickets = await Ticket.find({});
  res.status(200).json(tickets);
});

// Get a specific ticket for an agent
const getTicketAgent = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (user.isAgent !== true) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find a specific ticket by ID
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  res.status(200).json(ticket);
});

// Get a specific ticket for a user
const getTicketUser = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find a specific ticket by ID
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // Check if the user is authorized to access this ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// Create a new ticket for a user
const createTicketUser = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error("Please add a message");
  }

  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Create a new ticket
  const ticket = await Ticket.create({
    message,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// Delete a ticket for a user
const deleteTicketUser = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find a specific ticket by ID
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // Check if the user is authorized to delete this ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Delete the ticket
  await ticket.deleteOne();
  res.status(200).json({ success: true });
});

// Update a ticket for a user
const updateTicketUser = asyncHandler(async (req, res) => {
  // Get user using the id from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not found");
  }

  // Find a specific ticket by ID and update it
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTicketsUser,
  getTicketUser,
  createTicketUser,
  deleteTicketUser,
  updateTicketUser,
  getTicketsAgent,
  getTicketAgent
};
