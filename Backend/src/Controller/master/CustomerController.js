import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Customer from "../../Models/Master/customerSchema.js"

export const createcustomer = catchAsyncError(async (req, res, next) => {
  const actionType = "Save";
  if (actionType === "Save") {
    const customer = await Customer(req.body).save();
    res.status(201).json({ success: true, customer });
  }
//   else if()

 }
)


export const getAllCustomer = catchAsyncError(async (req, res, next) => {

  const customer = await Customer.find();

  res.status(201).json({ success: true, customer });
})