const mongoose = require("mongoose");

const cylinderTypeDataSchema = mongoose.Schema({
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

module.exports = mongoose.model("CylinderTypeData", cylinderTypeDataSchema);
