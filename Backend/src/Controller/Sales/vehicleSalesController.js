import VehicleSale from "../../Models/Stock/vehicleSalesSchema.js";
import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";

export const createVehicleSale = catchAsyncError(async (req, res) => {

  const sale = await VehicleSale(req.body).save();

  res.status(201).json({ success: true, sale });
});

export const getAllVehicleSales = catchAsyncError(async (req, res) => {
  const sales = await VehicleSale.find()
    .populate("model")
    .populate("customer")
    .populate("branch");

  res.status(200).json({ success: true, sales });
});
