import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncerror.js";
import Company from "../Models/CompanySchema.js"
import User from "../Models/userModel.js"
import ErrorHendler from "../utils/ErrorHendler.js";


export const isAuthenticated = catchAsyncError(async (req, res, next) => {

    let { token } = req.cookies;

    // If token is not in cookies, check Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorHendler("Please login to access the resource", 401));
    }

    const decoded = jwt.verify(token, process.env.jWt_SECRET || process.env.JWT_SECRET)

    let user = await Company.findById(decoded.id).select("-password");

    if (!user) {
        user = await User.findById(decoded.id).select("-PassW");
        if (user) {
            req.user = user;
        }
    } else {
        req.company = user;
    }

    if (!user) {
        return next(new ErrorHendler("Account not found", 404));
    }

    req.id = decoded.id;
    next();
})



