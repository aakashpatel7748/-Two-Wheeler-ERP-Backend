import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    address: String,
    city: String,
    pincode: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Customer", customerSchema);
