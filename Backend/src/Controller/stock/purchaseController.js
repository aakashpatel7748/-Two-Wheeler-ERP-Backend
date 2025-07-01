import PurchaseStock from "../../Models/Stock/purchaseStockSchema.js";
import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";

export const createPurchaseStock = catchAsyncError(async (req, res) => {
  const { model, quantity, purchasePrice, supplierName, branch } = req.body;

  const stock = await PurchaseStock.create({
    model,
    quantity,
    purchasePrice,
    supplierName,
    branch,
  });

  res.status(201).json({ success: true, stock });
});

export const getAllPurchaseStock = catchAsyncError(async (req, res) => {
  const stocks = await PurchaseStock.find()
    .populate("model")
    .populate("branch");
  res.status(200).json({ success: true, stocks });
});
