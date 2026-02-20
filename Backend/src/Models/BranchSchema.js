import mongoose from "mongoose";


const BranchSchema = new mongoose.Schema({
    BranchName: {
        type: String,
        required: [true, "Branch name is required!"],
    },
    BranchCode: {
        type: String,
        required: [true, "Branch code is required!"],
        unique: true,
        uppercase: true,
    },
    BranchContactNo: {
        type: String,
        required: [true, "Branch contact is required!"],
        minLength: [10, "Contact number must be at least 10 characters long!"],
        maxLength: [15, "Contact number must be at most 15 characters long!"],
    },

    BranchAddress: {
        type: String,
        required: [true, "Address is required"],
    },
    BranchCity: {
        type: String,
        required: [true, "City is required"],
    },
    BranchPincode: {
        type: String,
        required: [true, "Pincode is required"],
    },
    BranchState: {
        type: String,
        required: [true, "State is required"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },


}, { timestamps: true })

export default mongoose.model("Branch", BranchSchema);

