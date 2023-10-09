const express = require("express");
const { getNotes, addNote } = require("../controllers/noteController");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");

// Define routes for note-related operations

// Route to get notes for a specific ticket
// Since this router is merged with the parent router, it inherits the parameters,
// and it expects a parameter for the ticket ID in the URL.
router.route("/").get(protect, getNotes).post(protect, addNote);

// Export the router to be used in other parts of the application
module.exports = router;
