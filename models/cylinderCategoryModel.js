const mongoose = require("mongoose");

const cylinderCategoryDataSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

module.exports = mongoose.model(
  "CylinderCategoryData",
  cylinderCategoryDataSchema
);
