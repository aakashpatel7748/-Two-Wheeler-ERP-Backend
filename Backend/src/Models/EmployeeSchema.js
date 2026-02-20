import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
        minlength: 3
    },
    EmailId: {
        type: String,
        required: true,
        unique: true
    },
    MobileNo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    Designation: {
        type: String,
        required: true
    },
    PanCardNo: {
        type: String,
        required: false
    },
    DateOfJoining: {
        type: Date,
        default: Date.now
    },
    Salary: {
        type: String,
        default: '0'
    },
    City: {
        type: String,
        required: true
    },
    District: {
        type: String
    },
    PinCode: {
        type: String,
        required: true
    },
    StateName: {
        type: String,
        required: true
    },
    ResidentialAddress: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true
    },
    LoginId: {
        type: String
    },
    PassW: {
        type: String
    },
    IsActive: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    }

}, { timestamps: true });

export default mongoose.model("Employee", EmployeeSchema);