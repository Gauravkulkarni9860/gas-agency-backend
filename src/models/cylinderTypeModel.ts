import mongoose from "mongoose";

const cylinderTypeDataSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CylinderCategoryData",
    required: true,
  },
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  effective_date: { type: Number, required: true },
  isActive: Boolean,
});

export default mongoose.model("CylinderTypeData", cylinderTypeDataSchema);
