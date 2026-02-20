import mongoose from "mongoose";

const vehicleSalesSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CurrentStock", 
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  invoiceNumber: String,
});

export default mongoose.model("VehicleSale", vehicleSalesSchema);
