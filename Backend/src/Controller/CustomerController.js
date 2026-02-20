import { mongo } from "mongoose";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import Customer from "../Models/customerSchema.js"


export const getAllCustomers = catchAsyncError(async (req, res) => {

  const customers = await Customer.find({ createdBy: req.company.id });

  res.status(200).json({
    success: true,
    customers
  });
});

export const createCustomer = catchAsyncError(async (req, res) => {
  const { name, contact, email, address, city, pincode } = req.body;

  const existing = await Customer.findOne({ contact });
  if (existing) {
    return res.status(400).json({ success: false, message: "Customer already exists with this contact" });
  }

  const customer = await Customer.create({
    name,
    contact,
    email,
    address,
    city,
    pincode,
    createdBy: req.company.id
  });

  res.status(201).json({
    success: true,
    message: "Customer added successfully",
    customer
  });
});

export const updateCustomers = catchAsyncError(async (req, res) => {

  console.log("customers")
  const customers = await Customer.findByIdAndUpdate(req.params.id, req.body);
  if (!customers) {
    res.status(401).json({
      success: false,
      message: "coustomer not found!"
    });
  }
  res.status(200).json({
    success: true,
    customers
  });
});


export const deleteCustomers = catchAsyncError(async (req, res) => {

  const customers = await Customer.findByIdAndDelete(req.params.id);
  if (!customers) {
    res.status(401).json({
      success: false,
      message: "coustomer not found!"
    });
  }
  res.status(200).json({
    success: true,
    message:"customer delete successfully!"
  });
});








