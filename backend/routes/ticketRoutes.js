const express = require("express");
const {
  getTicketsUser,
  createTicketUser,
  getTicketUser,
  deleteTicketUser,
  updateTicketUser,
  getTicketsAgent,
  getTicketAgent
} = require("../controllers/ticketController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Re-route into note router, Doing this because we want to get /api/tickets/:ticketId/notes for displaying notes
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

// Define routes for ticket-related operations

// Routes for user-related tickets
router.route("/")
  .get(protect, getTicketsUser) // Get tickets for a user
  .post(protect, createTicketUser); // Create a new ticket for a user

// Routes for agent-related tickets
router.route("/all")
  .get(protect, getTicketsAgent); // Get all tickets for an agent

router.route("/all/:id")
  .get(protect, getTicketAgent); // Get a specific ticket for an agent

// Routes for both user and agent to get, update, and delete a ticket
router.route("/:id")
  .get(protect, getTicketUser) // Get a specific ticket for a user
  .delete(protect, deleteTicketUser) // Delete a specific ticket for a user
  .put(protect, updateTicketUser); // Update a specific ticket for a user

// Export the router to be used in other parts of the application
module.exports = router;
