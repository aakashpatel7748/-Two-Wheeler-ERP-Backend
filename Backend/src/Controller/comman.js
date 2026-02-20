import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import { sendToken } from "../utils/SendToken.js";
import { logger } from "../../lib/logger.js";
import ErrorHendler from "../utils/ErrorHendler.js";
import UserRole from "../Models/userRoleModel.js";

export const getDropdownList = catchAsyncError(async (req, res, next) => {
    const { actionType } = req.query;
    if (actionType == "userRoleList") {
        const TAG = "User Role List"
        logger.info(TAG)
        const userRole = await UserRole.find()
        res.status(200).json({
            success: true,
            userRole
        })
    }


})

export const getDropdownDetails = catchAsyncError(async (req, res, next) => {
    const { ActionType } = req.body


})






