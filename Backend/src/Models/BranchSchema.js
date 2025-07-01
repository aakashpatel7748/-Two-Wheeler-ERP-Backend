import mongoose from "mongoose";


const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Branch name is required!"],
    },
    code: {
        type: String,
        required: [true, "Branch code is required!"],
        unique: true,
        uppercase: true,
    },
    contact: {
        type: String,
        required: [true, "Branch contact is required!"],
        minLength: [10, "Contact number must be at least 10 characters long!"],
        maxLength: [10, "Contact number must be at most 15 characters long!"],
    },
    email: {
        type: String,
        unique: true,
        require: [true, "Email is require"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Plese fill a valid address"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
    },
    state: {
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


},{ timestamps: true })

export default mongoose.model("Branch", BranchSchema);

