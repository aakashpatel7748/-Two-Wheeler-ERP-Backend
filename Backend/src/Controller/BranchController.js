import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import Branch from "../Models/BranchSchema.js";
import { sendToken } from "../utils/SendToken.js";


export const getAllBranches = catchAsyncError(async (req, res, next) => {

    const branch = await Branch.find();
    console.log(branch)

    res.status(200).json({
        success: true,
        branch
    })

});

export const getBranche = catchAsyncError(async (req, res, next) => {

    const branch = await Branch.findById(req.params.id);

    res.status(200).json({
        success: true,
        branch
    })

});



export const createBranch = catchAsyncError(async (req, res, next) => {
    const { name, code, contact, email, address, city, pincode, state } = req.body;
    const branch = await  Branch.create({
        name,
        code,
        contact,
        email,
        address,
        city,
        pincode,
        state,
        createdBy: req.admin._id
    });
    console.log(branch)

    res.status(201).json({
        success: true,
        message: "Branch created successfully",
        branch
    });

});

export const updateBranch = catchAsyncError(async (req, res, next) => {

    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body,).exec();
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
})

export const deleteBranch = catchAsyncError(async (req, res, next) => {

    const branch = await Branch.findByIdAndDelete(req.params.id).exec();
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
}); 