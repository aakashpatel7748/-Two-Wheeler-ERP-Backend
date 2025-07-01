import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Stock from "../../Models/Stock/currentStockSchema.js"



export const currentStock = catchAsyncError(async (req, res, next) => {

    const stock = await Stock.find().populate("model").populate("branch");

    res.status(201).json({ success: true, customer });
})


export const getAllStock = catchAsyncError(async (req, res, next) => {

    const customer = await Stock.find();

    res.status(201).json({ success: true, customer })

});