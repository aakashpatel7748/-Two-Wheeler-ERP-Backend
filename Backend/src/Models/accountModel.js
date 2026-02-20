import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    AccountName: {
        type: String,
        required: true,
        minlength: 3
    },
    BankName: {
        type: String,
        required: true,
        unique: true
    },
    AccountNo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    DateOfAccount: {
        type: String,
        required: true
    },
    Balance: {
        type: String,
        required: false
    },
    AvailableBalance: {
        type: String,
        default: '0.00'
    },
    CCLimit: {
        type: String,
        default: '0'
    },
    Remark: {
        type: String,
        required: true
    },


}, { timestamps: true });

export default mongoose.model("account", accountSchema);
