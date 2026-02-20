import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRole from "./userRoleModel.js";

const userSchema = new mongoose.Schema({
    UserName: {
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
        type: String,
        select: false
    },

    RoleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required: false
    },
    GVItems: {
        type: String,
        default: "[]"
    },
    IsActive: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    }

}, { timestamps: true });

userSchema.pre("save", function () {
    if (!this.isModified("PassW")) {
        return
    }

    let salt = bcrypt.genSaltSync(10);
    this.PassW = bcrypt.hashSync(this.PassW, salt)
})

userSchema.methods.ComparePassword = function (password) {
    return bcrypt.compareSync(password, this.PassW)
}

userSchema.methods.getJwtToken = async function () {
    let permissions = {};
    if (this.RoleID) {
        const userRole = await UserRole.findById(this.RoleID);
        if (userRole && userRole.Role) {
            permissions = userRole.Role.toObject();
        }
    }

    return jwt.sign(
        {
            id: this._id,
            role: "user",
            ...permissions
        },
        process.env.jWt_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        })
}

export default mongoose.model("User", userSchema);
