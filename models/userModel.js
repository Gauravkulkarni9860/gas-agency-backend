const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "User name not found in request."],
    },
    email: {
      type: String,
      required: [true, "Email not found in request."],
      unique: [true, "Email address already registered."],
    },
    password: {
      type: String,
      required: [true, "Password not found in request."],
    },
    user_type: {
      type: String,
      required: [true, "User type not found in request."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
