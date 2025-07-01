import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    designation: {
        type: String,
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    }
     
}, { timestamps: true });

export default mongoose.model("Employee", EmployeeSchema);