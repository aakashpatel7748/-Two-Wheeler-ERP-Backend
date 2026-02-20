import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const companySchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: [true, "First name is require"],
        minLength: [4, "First name should be have atleast 4 charecter long"]
    },
    lastname: {
        type: String,
        require: [true, "Last name is require"],
        minLength: [4, "Last name should be have atleast 4 charecter long"]
    },

    contact: {
        type: String,
        require: [true, "Contact  is require"],
        maxLength: [10, "Contact must not exceed 10 charecter"],
        minLength: [10, "Contact should be atleast 10 charecter long"]
    },
    city: {
        type: String,
        require: [true, "City name is require"],
        minLength: [3, "City should be have atleast 4 charecter long"]
    },

    email: {
        type: String,
        unique: true,
        require: [true, "Email is require"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Plese fill a valid address"]
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more then 15 characters"],
        minLength: [6, "Password should have atLeast 6 characters"],
    },

    resetPasswordToken: {
        type: String,
        default: "0"
    },

    role: {
        type: String,
        enum: ["company"],
        default: "company"
    },


    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    avatar: {
        type: Object,
        default: {
            file: "",
            url: "https://images.unsplash.com/photo-1761839258657-457dda39b5cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
        }
    }


}, { timestamps: true })

companySchema.pre("save", function () {
    if (!this.isModified("password")) {
        return
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
})

companySchema.methods.ComparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


companySchema.methods.getJwtToken = function () {
    const permissions = {
        IsAdmin: "True",
        IsCompanies: "True",
        IsParts: "True",
        IsService: "True",
        IsAgents: "True",
        IsFinancers: "True",
        IsInsurers: "True",
        IsTradeAdvance: "True",
        IsModels: "True",
        IsSHWPurchase: "True",
        IsVehicleTransit: "True",
        IsSHWSales: "True",
        IsQuotation: "True",
        IsAgreement: "True",
        IsBooking: "True",
        IsSHWSales: "True",
        IsSHWTaxInvoice: "True",
        IsSHWSales: "True",
        IsWorkshopPurchase: "True",
        IsSpareTransit: "True",
        IsWorkshopSales: "True",
        IsMechanics: "True",
        IsJobCard: "True",
        IsEInvoice: "True",
        IsInquiry: "True",
        IsSHWFinance: "True",
        IsSHWRTO: "True",
        IsSHWInsurance: "True",
        IsOldVehicle: "True",
        IsPaymentMade: "True",
        IsSave: "True",
        IsUpdate: "True",
        IsDelete: "True",
        IsBooking: "True",
        IsPurchase: "True",
        IsSale: "True",
        IsAccount: "True",
    }
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
            ...permissions
        },
        process.env.jWt_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        })
}


export default mongoose.model("company", companySchema)

