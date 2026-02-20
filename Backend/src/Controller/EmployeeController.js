import { logger } from "../../lib/logger.js";
import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import Employee from "../Models/EmployeeSchema.js";
import userModel from "../Models/userModel.js";



export const getEmployees = catchAsyncError(async (req, res, next) => {


    const { actionType, TRNo } = req.query;
    if (actionType === "listById") {
        const TAG = "Employee Get listById"
        logger.info(TAG)
        const employee = await Employee.findById(TRNo);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found!",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully!",
            employee
        });
    }
    else if (actionType === "list") {
        const TAG = "Employee Get list"
        logger.info(TAG)
        const employees = await Employee.find().sort({ createdAt: -1 });
        if (!employees) {
            return res.status(404).json({
                success: false,
                message: "No employees found!",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Employees fetched successfully!",
            employees
        });
    }
    else if (actionType === "salaryById") {
        const TAG = "Employee Get salaryById"
        logger.info(TAG)
        const employee = await Employee.find({ _id: TRNo });
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found!",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully!",
            employee
        });
    }

});

export const employe = catchAsyncError(async (req, res, next) => {
    const { actionType, id } = req.query

    if (actionType === "save") {
        const TAG = "Empoly Save"
        logger.info(TAG)
        const {
            FullName, EmailId, MobileNo, Designation, PanCardNo,
            DateOfJoining, Salary, City, District, PinCode,
            StateName, ResidentialAddress, LoginId, PassW, IsActive
        } = req.body;
        if (!FullName || !EmailId || !MobileNo || !Designation) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled!",
            });
        }

        const existing = await Employee.findOne({ EmailId });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists with this email"
            });
        }

        const employee = await Employee.create({
            FullName, EmailId, MobileNo, Designation, PanCardNo,
            DateOfJoining, Salary, City, District, PinCode,
            StateName, ResidentialAddress, LoginId, PassW, IsActive,
            createdBy: req.company.id
        });

        if (IsActive === "Active") {
            await userModel.create({
                UserName: FullName,
                EmailId,
                MobileNo,
                Designation,
                PanCardNo,
                DateOfJoining,
                Salary,
                City,
                District,
                PinCode,
                StateName,
                ResidentialAddress,
                LoginId,
                PassW,
                IsActive,
                createdBy: req.company.id
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee created successfully!",
            employee
        });
    }
    else if (actionType === "update") {
        const TAG = "update Employee"
        logger.info(TAG)
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found!" })
        }

        if (employee.IsActive === "Active") {
            await userModel.findOneAndUpdate(
                { EmailId: employee.EmailId },
                {
                    UserName: employee.FullName,
                    EmailId: employee.EmailId,
                    MobileNo: employee.MobileNo,
                    Designation: employee.Designation,
                    PanCardNo: employee.PanCardNo,
                    DateOfJoining: employee.DateOfJoining,
                    Salary: employee.Salary,
                    City: employee.City,
                    District: employee.District,
                    PinCode: employee.PinCode,
                    StateName: employee.StateName,
                    ResidentialAddress: employee.ResidentialAddress,
                    LoginId: employee.LoginId,
                    PassW: employee.PassW,
                    IsActive: employee.IsActive,
                    createdBy: req.company.id
                },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully!",
            employee
        });
    }
    else if (actionType === "delete") {
        const TAG = "delete Employe"
        logger.info(TAG)
        await Employee.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully!"
        });
    }

});


