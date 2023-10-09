const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// Get notes for a specific ticket (Agent)
const getNotes = asyncHandler(async (req, res) => {
  // Get the user using the ID from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Find the ticket by ID
  const ticket = await Ticket.findById(req.params.ticketId);

  // Find notes associated with the specific ticket
  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// Add a note for a specific ticket (Agent)
const addNote = asyncHandler(async (req, res) => {
  // Get the user using the ID from the request
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if the user is an agent
  if (user.isAgent !== true) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  // Find the ticket by ID
  const ticket = await Ticket.findById(req.params.ticketId);

  // Create a new note associated with the specific ticket
  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    user: ticket.user,
  });

  res.status(200).json(note);
});

module.exports = { getNotes, addNote };
