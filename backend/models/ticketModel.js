const mongoose = require("mongoose");

// Define the schema for the Ticket model
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User", // Reference to the User model
    },
    message: {
      type: String,
      required: [true, "Please enter the query of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"], // Status can only be one of these values
      default: "new", // Default status is "new"
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to the document
  }
);

// Export the Ticket model
module.exports = mongoose.model("Ticket", ticketSchema);
