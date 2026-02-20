import { catchAsyncError } from "../../Middleware/catchAsyncError.js";
import Model from "../../Models/Master/modelSchema.js"

export const createModel = catchAsyncError(async (req, res) => {
  const { name, price, company } = req.body;

  const model = await Model.create({
    name,
    price,
    company
  });

  res.status(201).json({ success: true, model });
});

// getAllModels
export const getAllModels = catchAsyncError(async (req, res) => {
  const models = await Model.find().populate("company", "name");
  res.status(200).json({ success: true, models });
});
