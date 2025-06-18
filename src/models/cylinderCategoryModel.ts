import mongoose from "mongoose";

const cylinderCategoryDataSchema = new mongoose.Schema({
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

export default mongoose.model(
  "CylinderCategoryData",
  cylinderCategoryDataSchema
);
