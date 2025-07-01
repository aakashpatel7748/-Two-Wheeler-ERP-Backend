import { catchAsyncError } from "../../Middleware/catchAsyncerror.js";
import Company from "../../Models/Master/companySchema.js"
import Admin from "../../Models/adminSchema.js"


export const createCompany = catchAsyncError(async (req, res) => {
  const { ActionType } = req.body;
  if (ActionType == "save") {
    const superAdminID = req.id;
    const { name,  email } = req.body;

    const existingCompany = await Company.findOne({ name: name });
    const existingAdmin = await Admin.findOne({ email: email });
  

    if (existingCompany || existingAdmin) {
      return res.status(400).json({ message: "Company or Admin already exists" });
    }

    const company = await Company.create({
      name,
      createBy:superAdminID
    });

    const admin = await Admin.create({
      email,
      ...req.body
    })

    res.status(201).json({
      success: true,
      company, admin
    });
  }

  if (ActionType == "all") {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      companies
    });
  }

  else if (ActionType == "update") {
    await Company.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      sucess: true,
      message: "Company Updated Successfully!",

    })
  }

  else if (ActionType == "delete") {
    await Company.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "Company Delete Successfully!",

    })
  }

})







