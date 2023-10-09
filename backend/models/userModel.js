const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAgent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to the document
  }
);

// Export the User model
module.exports = mongoose.model("User", userSchema);
