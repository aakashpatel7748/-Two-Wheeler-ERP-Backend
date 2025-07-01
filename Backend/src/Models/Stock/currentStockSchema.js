import mongoose from "mongoose";

const currentStockSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Model",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model("CurrentStock", currentStockSchema);
