import jwt from "jsonwebtoken"
import { catchAsyncError } from "../Middleware/catchAsyncerror.js";
import superAdmin from "../Models/superAdminSchema.js"


export const isAuthenticated = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next("Plese login in to the access the resource", 404)
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await superAdmin.findById(decoded.id).select("-password");
    if (!admin) {
        return next("Admin not found", 404);
    }
    req.admin = admin;

    req.id = decoded.id;
    next();
})