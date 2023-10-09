const mongoose = require("mongoose");

// Define the schema for the Note model
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User", // Reference to the User model
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Ticket model
      required: true,
      ref: "Ticket", // Reference to the Ticket model
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    agentName: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to the document
  }
);

// Export the Note model
module.exports = mongoose.model("Note", noteSchema);
