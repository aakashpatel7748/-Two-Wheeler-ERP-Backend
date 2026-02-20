import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import Company from "../Models/CompanySchema.js";
import { sendToken } from "../utils/SendToken.js";
import { logger } from "../../lib/logger.js";
import { sendMail } from "../utils/nodemailer.js";
import ErrorHendler from "../utils/ErrorHendler.js";
import { imagekit } from "../utils/imagekit.js"
import path from "path"
import userModel from "../Models/userModel.js";


export const companyContoller = catchAsyncError(async (req, res, next) => {
    const { ActionType } = req.body

    if (ActionType == "companyget") {
        const company = await Company.findById(req.id);
        if (!company) {
            return res.status(404).json({ success: false, message: "superAdmin not found" });
        }
        res.status(200).json({
            success: true,
            company
        })
    }

    else if (ActionType == "save") {
        const company = await new Company(req.body).save();
        await sendToken(company, 201, res)
    }

    else if (ActionType == "login") {
        const TAG = "Login"
        logger.info(TAG)
        const { email, password, loginId } = req.body

        let user = await Company.findOne({ email }).select("+password").exec();

        if (!user) {
            user = await userModel.findOne({
                $or: [
                    { EmailId: email },
                    { LoginId: loginId || email }
                ]
            }).select("+PassW").exec();
        }

        if (!user) {
            return next(new ErrorHendler("Invalid email or password", 400))
        }

        const isMatch = user.ComparePassword(password)
        if (!isMatch) return next(new ErrorHendler("wrong credientials", 500))

        await sendToken(user, 201, res)

    }

    else if (ActionType == "getCompanyDetails") {
        const company = await Company.find();
        if (!company) {
            return res.status(404).json({ success: false, message: "superAdmin not found" });
        }
        res.status(200).json({
            success: true,
            company
        })
    }

    else if (ActionType == "forget-password") {
        const company = await Company.findOne({ email: req.body.email }).exec();
        if (!company) {
            return next(new ErrorHendler("Invalid email ", 400))
        }

        const url = `${req.protocol}://${req.get("host")}/company/forget-password/${company._id}`

        sendMail(req, res, next, url)

        company.resetPasswordToken = "1";
        await company.save();

        res.status(200).json({
            success: true,
            message: "Password Forget Link Generated Successfully",
            url
        });


    }

    else if (ActionType == "reset-password") {
        const TAG = "Company Reset Password"
        logger.info(TAG)
        const company = await Company.findById(req.id).exec();

        company.password = req.body.password;
        await company.save();

        await sendToken(company, 201, res)
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully!",
        });


    }

    else if (req.query.actionType == "logout") {
        const TAG = "Compony Logout"
        logger.info(TAG)
        res.clearCookie("token");
        res.json({ message: "successfully signout" })
    }

    else if (ActionType == "update") {
        await Company.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            sucess: true,
            message: " Company Updated Successfully!",

        })
    }

    else {
        return res.status(400).json({ success: false, message: "Invalid ActionType" });
    }

})

export const forgetPassword = catchAsyncError(async (req, res, next) => {
    const TAG = "Compony Reset Password"
    logger.info(TAG)
    const company = await Company.findById(req.params.id)

    if (!company) return next(new ErrorHendler("Company not found", 404))

    if (company.resetPasswordToken == "1") {
        company.resetPasswordToken = "0"
        company.password = req.body.password
        await company.save()
    } else {
        return next(new ErrorHendler("Invalid Reset Password Link! Please Generate New Link", 500))
    }
    res.status(200).json({
        message: "Password Forget Successfully Changed!"
    })
})

export const avatar = catchAsyncError(async (req, res, next) => {
    const TAG = "Company Avatar"
    logger.info(TAG)

    const company = await Company.findById(req.params.id)
    if (!company) return next(new ErrorHendler("Company not found", 404))

    const file = req.files.file
    const modifiedFileName = `company-avatar-${Date.now()}${path.extname(file.name)}`

    if (company.avatar.fileId !== "") {
        await imagekit().deleteFile(company.avatar.fileId)
    }

    const { fileId, url } = await imagekit().upload({
        file: file.data,
        fileName: modifiedFileName
    })

    company.avatar = { fileId, url }
    await company.save()

    res.status(200).json({
        success: true,
        message: "ProfileImage Updated Successfully!"
    })
})




