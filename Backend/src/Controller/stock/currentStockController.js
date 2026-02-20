import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Stock from "../../Models/Stock/currentStockSchema.js"



export const currentStock = catchAsyncError(async (req, res, next) => {

    const stock = await Stock.find().populate("model");

    res.status(201).json({ success: true, stock });
})


export const getAllStock = catchAsyncError(async (req, res, next) => {

    const customer = await Stock.find();

    res.status(201).json({ success: true, customer })

});

export const getFilteredStock = catchAsyncError(async (req, res, next) => {
    const isSold = req.query.sold === "true"; 
    const stocks = await Stock.find({ branch: req.branch.id, isSold });

    res.status(200).json({
        success: true,
        stocks
    });
});