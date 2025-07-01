import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const AdminSchema = new mongoose.Schema({

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


    role: {
        type: String,
        enum: ["Admin",],
        default: "Admin"
    },

    
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }


}, { timestamps: true })

AdminSchema.pre("save", function () {
    if (!this.isModified("password")) {
        return
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
})

AdminSchema.methods.ComparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


AdminSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id,  }, process.env.jWt_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
// token : {IsAdmin :ture , IsSave , IsUpdate , IsDelete , IsBooking , IsPurchase , IsSale, IsAccount , }


export default mongoose.model("Admin", AdminSchema)

