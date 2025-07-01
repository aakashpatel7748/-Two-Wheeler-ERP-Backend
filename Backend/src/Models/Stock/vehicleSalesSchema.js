import mongoose from "mongoose";

const vehicleSalesSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Model",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  invoiceNumber: String,
});

export default mongoose.model("VehicleSale", vehicleSalesSchema);
