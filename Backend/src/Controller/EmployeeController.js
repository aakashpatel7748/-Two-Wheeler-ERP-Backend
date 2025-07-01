import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import Employee from "../Models/EmployeeSchema.js";



export const getAllEmployees = catchAsyncError(async (req, res, next) => {

    const employees = await Employee.find().populate("branch");

    if (!employees) {
        return res.status(401).json({
            success: false,
            message: "not empoloyee!",
        })
    }

    res.status(200).json({ success: true, employees });
});


export const createEmployees = catchAsyncError(async (req, res, next) => {
    console.log(req.admin.branch)
    await new Employee(req.body).save();
    res
        .status(200)
        .json({
            success: true,
            message: "employees created successfull!"
        });
});


export const updateEmployees = catchAsyncError(async (req, res, next) => {

    const empoloyee = await  Employee.findByIdAndUpdate(req.params.id, req.body);

    if(!empoloyee){
        return res.satatus(401).json({success:false, message:"empoloyee not found!"})
    }

    res
        .status(200)
        .json({
            success: true,
            message: "employees updated successfull!"
        });
});


export const deleteEmployees = catchAsyncError(async (req, res, next) => {

    const empoloyee = await  Employee.findByIdAndDelete(req.params.id);

    res
        .status(200)
        .json({
            success: true,
            message: "employees delete successfull!"
        });
});
