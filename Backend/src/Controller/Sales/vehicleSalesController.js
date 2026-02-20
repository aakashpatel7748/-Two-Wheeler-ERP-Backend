import VehicleSale from "../../Models/Stock/vehicleSalesSchema.js";
import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Stock from "../../Models/Stock/currentStockSchema.js"

export const createVehicleSale = catchAsyncError(async (req, res) => {
  const { customer, vehicle, salePrice, invoiceNumber } = req.body;

  const sale = await VehicleSale.create({
    customer,
    vehicle,
    salePrice,
    invoiceNumber,
    createdBy: req.company.id
  });

  // Optionally mark vehicle as sold in stock
   await Stock.findByIdAndUpdate(vehicle, { isSold: true });

  res.status(200).json({
    success: true,
    message: "Vehicle sold successfully!",
    sale
  });
});

export const getAllVehicleSales = catchAsyncError(async (req, res) => {
  const sales = await VehicleSale.find()
    .populate("customer")
    .populate("vehicle");

  res.status(200).json({ success: true, sales });
});
