import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import Branch from "../Models/BranchSchema.js";
import { logger } from "../../lib/logger.js";


export const getBranch = catchAsyncError(async (req, res, next) => {

    const { actionType, TRNo } = req.query

    if (actionType === "list") {
        const TAG = "Get Branches List"
        logger.info(TAG)
        const branch = await Branch.find().sort({ createdAt: -1 })
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            })
        }
        return res.status(200).json({
            success: true,
            branch,
            message: "Branch list fetched successfully"
        })
    } else if (actionType === "ListById") {
        const TAG = "Get Branches List By Id"
        logger.info(TAG)
        const branch = await Branch.findById(TRNo)
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            })
        }
        return res.status(200).json({
            success: true,
            branch,
            message: "Branch fetched successfully"
        })
    }


});

export const Branchs = catchAsyncError(async (req, res, next) => {
    const { actionType, id } = req.query;
    if (actionType == "save") {
        const branch = await Branch.create({
            ...req.body,
            createdBy: req.company.id
        });

        res.status(201).json({
            success: true,
            message: "Branch created successfully",
            branch,

        });
    }
    else if (actionType == "update") {
        const branch = await Branch.findByIdAndUpdate(id, req.body,).exec();
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Branch updated successfully",
            branch
        });
    }
    else if (actionType == "delete") {
        const branch = await Branch.findByIdAndDelete(id).exec();
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Branch deleted successfully",

        });
    }
});

