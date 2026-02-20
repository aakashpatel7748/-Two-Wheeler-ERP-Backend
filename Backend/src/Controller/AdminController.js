import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import Admin from "../Models/adminSchema.js";
import { sendToken } from "../utils/SendToken.js";



export const currentUser = catchAsyncError(async (req, res, next) => {

    const admin = await Admin.findById(req.id);

    if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
        success: true,
        admin
    })

})


export const adminsignup = catchAsyncError(async (req, res, next) => {

    const admin = await new Admin(req.body).save();

    sendToken(admin, 201, res)


})
export const adminsignin = catchAsyncError(async (req, res, next) => {

    const admin = await Admin.findOne({ email: req.body.email }).select("+password").exec();

    if (!admin) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isMatch = admin.ComparePassword(req.body.password)
    if (!isMatch) return ("wrong credientials", 500)

    sendToken(admin, 201, res)

})

export const adminlogout = catchAsyncError(async (req, res, next) => {

    res.clearCookie("token");
    res.json({ message: "successfully signout" })

})
