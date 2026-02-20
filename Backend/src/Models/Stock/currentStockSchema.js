import mongoose from "mongoose";

const currentStockSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Model",
    required: true,
  },
  company: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  isSold:
  {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model("CurrentStock", currentStockSchema);
