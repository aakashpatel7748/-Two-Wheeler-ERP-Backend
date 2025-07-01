import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import UserSchema from "../Models/UserSchema.js";

export const getAllUser = catchAsyncError(async (req, res, next) => {
    const user = UserSchema.find().populate("branch");
    if (!user) {
        return res.status(401).json({ success: false, message: "user not Found!", })
    }

    res.status(200).json({ success: true, user });
})

export const createuser = catchAsyncError(async (req, res) => {

    const user = await new UserSchema(req.body).save();
    if (!user) {
        return res.status(400).json({ success: false, message: err.message });
    }

    res.status(201).json({ success: true, user });

});


export const updateuser = catchAsyncError(async (req, res) => {

    const user = await new UserSchema.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
        return res.status(400).json({ success: false, message: "user not Found!" });
    }

    res.status(201).json({ success: true, user });

});

export const deleteuser = catchAsyncError(async (req, res) => {

    const user = await new UserSchema.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(400).json({ success: false, message: "user not Found!" });
    }

     res.status(200).json({ success: true, message: "User deleted" });

});

