import PurchaseStock from "../../Models/Stock/purchaseStockSchema.js";
import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Stock from "../../Models/Stock/currentStockSchema.js"


export const getAllPurchaseStock = catchAsyncError(async (req, res) => {
  const stocks = await PurchaseStock.find();

  res.status(200).json({ success: true, stocks });
});

export const createPurchaseStock = catchAsyncError(async (req, res) => {
  const { model, company, purchaseDate, purchasePrice, invoiceNumber, quantity, details, branch } = req.body;

  const purchaseRecord = await PurchaseStock.create({
    model,
    company,
    invoiceNumber,
    purchaseDate,
    purchasePrice,
    quantity,
    branch,
  });


  const stockArray = [];

  for (let i = 0; i < quantity; i++) {
    stockArray.push({
      model,
      company,
      purchaseDate,
      isSold: false,
      quantity,
      createdBy: branch
    });
  }

  const insertedStocks = await Stock.create(stockArray);

  res.status(200).json({
    success: true,
    message: `${quantity} vehicles added to stock.`,
    insertedStocks,
    purchaseRecord
  });

});


export const updatePurchaseStock = catchAsyncError(async (req, res) => {
  const stocks = await PurchaseStock.findByIdAndUpdate(req.params.id, req.body);

   if (!stocks) {
    res.status(401).json({
      success: false,
      message: "PurchaseStock not found!"
    });
  }
  res.status(200).json({
    success: true,
    message:"PurchaseStock update successfully!"
  });
});



export const deletePurchaseStock = catchAsyncError(async (req, res) => {
  const stocks = await PurchaseStock.findOneAndDelete(req.params.id);

if (!stocks) {
    res.status(401).json({
      success: false,
      message: "PurchaseStock not found!"
    });
  }
  res.status(200).json({
    success: true,
    message:"PurchaseStock delete successfully!"
  });
});

