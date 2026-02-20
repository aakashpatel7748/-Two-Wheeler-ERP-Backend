import mongoose from "mongoose";
import { logger } from "../../lib/logger.js";
import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import Branch from "../Models/BranchSchema.js";
import Employee from "../Models/EmployeeSchema.js";
import userModel from "../Models/userModel.js";
import UserRole from "../Models/userRoleModel.js";
import ErrorHendler from "../utils/ErrorHendler.js";
import Account from "../Models/accountModel.js";



export const getUserRole = catchAsyncError(async (req, res, next) => {
    const { actionType, TRNo } = req.query;

    if (actionType === "listOfUser") {
        const TAG = "Get List of User";
        logger.info(TAG);

        // Populate RoleID and createdBy if needed
        const users = await userModel.find().populate("RoleID");

        if (!users) {
            return next(new ErrorHendler("Users not Found", 400));
        }

        const formattedUsers = users.map(user => ({
            _id: user._id,
            UserName: user.UserName,
            LoginId: user.LoginId,
            UserType: user.Designation, // Or whatever mapping fits
            RoleName: user.RoleID ? user.RoleID.RoleName : "No Role Assign",
            CurrentStatus: user.IsActive,
            // Additional fields if needed
        }));

        return res.status(200).json({
            success: true,
            user: formattedUsers
        });

    } else if (actionType === "getUserWithBranch") {
        const TAG = "Get User With Branch";
        logger.info(TAG);

        const user = await userModel.findById(TRNo);
        if (!user) {
            return next(new ErrorHendler("User not Found", 400));
        }

        // Fetch all branches
        const allBranches = await Branch.find({ status: "Active" });

        let userGVItems = [];
        try {
            userGVItems = user.GVItems ? JSON.parse(user.GVItems) : [];
        } catch (e) {
            userGVItems = [];
        }

        // Initialize GVItems with all branches if empty or merge?
        // Usually, we provide a list of ALL branches so user can pick.
        const branchesForUI = allBranches.map(branch => {
            const assigned = userGVItems.find(item => item.ItemId === branch._id.toString());
            return {
                ItemId: branch._id.toString(),
                ItemName: branch.BranchName,
                status: assigned ? assigned.status : false
            };
        });

        const userWithBranches = {
            ...user._doc,
            GVItems: JSON.stringify(branchesForUI)
        };

        return res.status(200).json({
            success: true,
            user: [userWithBranches]
        });

    } else if (actionType === "listOfRole") {
        const TAG = "Get List of Role";
        logger.info(TAG);

        const roles = await UserRole.find();
        const users = await userModel.find();

        const roleList = roles.map(role => {
            const assignedUsers = users.filter(u => u.RoleID && u.RoleID.toString() === role._id.toString());
            return {
                RoleId: role._id,
                RoleName: role.RoleName,
                AssignUserCount: assignedUsers.length,
                AssignUser: assignedUsers.map(u => u.UserName).join(", "),
                Role: role.Role
            };
        });

        return res.status(200).json({
            success: true,
            userRole: roleList
        });

    } else if (actionType === "listById") {
        const TAG = "Get List of Role By Id";
        logger.info(TAG);

        const userRole = await UserRole.findById(TRNo);
        if (!userRole) {
            return next(new ErrorHendler("User Role not Found", 400));
        }

        // Format to match frontend expectance (RoleId instead of _id for convenience if needed)
        const formattedRole = {
            ...userRole.Role,
            RoleId: userRole._id,
            RoleName: userRole.RoleName
        };

        return res.status(200).json({
            success: true,
            userRole: [formattedRole]
        });
    } else if (actionType === "userRoleList") {
        const TAG = "Get User Role List for Dropdown";
        logger.info(TAG);

        const roles = await UserRole.find({}, "RoleName");
        return res.status(200).json({
            success: true,
            data: roles // The frontend uses Response.data
        });
    }
});

export const assignBranch = catchAsyncError(async (req, res, next) => {
    const TAG = "Assign Role and Branch";
    logger.info(TAG);

    const { Id, RoleId, GVItems } = req.body;

    const user = await userModel.findById(Id);
    if (!user) {
        return next(new ErrorHendler("User not Found", 404));
    }

    user.RoleID = RoleId;
    user.GVItems = JSON.stringify(GVItems);
    await user.save();

    return res.status(200).json({
        success: true,
        status: true, // Frontend checks response.data.status
        message: "Role and Branches assigned successfully!"
    });
});

export const UserRoles = catchAsyncError(async (req, res, next) => {
    const { actionType } = req.query;

    if (actionType === "save") {
        const TAG = "Save User Role";
        logger.info(TAG);

        const { RoleName, RoleId, ...rest } = req.body;

        const userRole = await UserRole.create({
            RoleName: RoleName,
            Role: rest,
            createdBy: req.company.role === "company" ? req.id : req.user.createdBy
        });

        return res.status(200).json({
            success: true,
            data: { success: true }, // Frontend checks response.data.data.success
            message: "User Role saved successfully!",
            userRole
        });

    } else if (actionType === "update") {
        const TAG = "Update User Role";
        logger.info(TAG);

        const { _id, RoleId, RoleName, ...rest } = req.body;
        const idToUpdate = _id || RoleId;

        const userRole = await UserRole.findByIdAndUpdate(idToUpdate, {
            RoleName: RoleName,
            Role: rest
        }, { new: true, runValidators: true });

        if (!userRole) {
            return next(new ErrorHendler("User Role not Found", 404));
        }

        return res.status(200).json({
            success: true,
            data: { success: true },
            message: "User Role updated successfully!",
            userRole
        });

    } else if (actionType === "delete") {
        const TAG = "Delete User Role";
        logger.info(TAG);

        const { _id, RoleId } = req.body;
        const idToDelete = _id || RoleId;

        const userRole = await UserRole.findByIdAndDelete(idToDelete);

        if (!userRole) {
            return next(new ErrorHendler("User Role not Found", 404));
        }

        return res.status(200).json({
            success: true,
            data: { success: true },
            message: "User Role deleted successfully!"
        });
    }
});

// Admin Account Controllers
export const AccountControllers = catchAsyncError(async (req, res, next) => {
    const { actionType, TRNo } = req.query;

    if (actionType === "listById") {
        const TAG = "Get Account By Id";
        logger.info(TAG);
        const account = await Account.findById(TRNo);
        if (!account) {
            return next(new ErrorHendler("Account not Found", 404));
        }
        return res.status(200).json({
            success: true,
            account: [account]
        });

    } else if (actionType === "list") {
        const TAG = "Get All Accounts";
        logger.info(TAG);
        const accounts = await Account.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            account: accounts
        });
    } else if (actionType === "save") {
        const TAG = "Save Account";
        logger.info(TAG);

        const { AccountName, BankName, AccountNo, DateOfAccount, Balance, Remark, CCLimit } = req.body;

        if (!AccountName || !BankName || !AccountNo || !DateOfAccount || !Remark) {
            return next(new ErrorHendler("All required fields must be filled!", 400));
        }

        const existingAccount = await Account.findOne({ BankName });
        if (existingAccount) {
            return next(new ErrorHendler("Account already exists with this Bank Name", 400));
        }

        const account = await Account.create({
            AccountName,
            BankName,
            AccountNo,
            DateOfAccount,
            Balance,
            CCLimit,
            Remark
        });

        return res.status(200).json({
            success: true,
            message: "Account saved successfully!",
            account
        });

    } else if (actionType === "update") {
        const TAG = "Update Account";
        logger.info(TAG);

        const { _id, ...updateData } = req.body;
        const idToUpdate = _id || Id;

        const account = await Account.findByIdAndUpdate(idToUpdate, updateData, { new: true, runValidators: true });

        if (!account) {
            return next(new ErrorHendler("Account not Found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Account updated successfully!",
            account
        });

    } else if (actionType === "delete") {
        const TAG = "Delete Account";
        logger.info(TAG);

        const idToDelete = req.body._id || Id;

        const account = await Account.findByIdAndDelete(idToDelete);

        if (!account) {
            return next(new ErrorHendler("Account not Found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!"
        });

    }
    // Get List of Opening Balance

    else if (actionType === "listOfOB") {
        const TAG = "Get List of Opening Balance";
        logger.info(TAG);

        const accounts = await Account.find();
        return res.status(200).json({
            success: true,
            account: accounts
        });
    } else if (actionType === "updateOB") {
        const TAG = "Update Opening Balance";
        logger.info(TAG);

        const { SNo, ...updateData } = req.body;
        console.log("updateData", updateData, SNo)
        const idToUpdate = SNo;

        const account = await Account.findByIdAndUpdate(idToUpdate, updateData, { new: true, runValidators: true });

        if (!account) {
            return next(new ErrorHendler("Account not Found", 404));
        }

        return res.status(200).json({
            success: true,
            message: "Account updated successfully!",
            account
        });
    }
});

