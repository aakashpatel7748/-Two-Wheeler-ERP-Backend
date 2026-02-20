import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import SuperAdmin from "../Models/superAdminSchema.js";
import { sendToken } from "../utils/SendToken.js";



export const superAdminContoller = catchAsyncError(async (req, res, next) => {

    const { ActionType } = req.body

    if (ActionType == "currentAdmin") {
        const superAdmin = await SuperAdmin.findById(req.id);
        if (!superAdmin) {
            return res.status(404).json({ success: false, message: "superAdmin not found" });
        }
        res.status(200).json({
            success: true,
            superAdmin
        })
    }

    else if (ActionType == "save") {
        const superAdmin = await new SuperAdmin(req.body).save();
        sendToken(superAdmin, 201, res)
    }

    else if (ActionType == "login") {
        const superAdmin = await SuperAdmin.findOne({ email: req.body.email }).select("+password").exec();
        if (!superAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = superAdmin.ComparePassword(req.body.password)
        if (!isMatch) return ("wrong credientials", 500)

        sendToken(superAdmin, 201, res)

    }



    else if (ActionType == "logout") {
        res.clearCookie("token");
        res.json({ message: "successfully signout" })
    }

    else {
        return res.status(400).json({ success: false, message: "Invalid ActionType" });
    }



})



