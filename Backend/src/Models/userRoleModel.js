import mongoose from "mongoose";

// Helper function to match CompanySchema's "True"/"False" format
const toPascalString = (val) => {
    if (val === true || val === "true" || val === "True") return "True";
    return "False";
};

const rolePermissionsSchema = new mongoose.Schema({
    IsAdmin: { type: String, set: toPascalString },
    IsCompanies: { type: String, set: toPascalString },
    IsParts: { type: String, set: toPascalString },
    IsService: { type: String, set: toPascalString },
    IsAgents: { type: String, set: toPascalString },
    IsFinancers: { type: String, set: toPascalString },
    IsInsurers: { type: String, set: toPascalString },
    IsTradeAdvance: { type: String, set: toPascalString },
    IsModels: { type: String, set: toPascalString },
    IsSHWPurchase: { type: String, set: toPascalString },
    IsVehicleTransit: { type: String, set: toPascalString },
    IsSHWSales: { type: String, set: toPascalString },
    IsQuotation: { type: String, set: toPascalString },
    IsAgreement: { type: String, set: toPascalString },
    IsBooking: { type: String, set: toPascalString },
    IsSHWTaxInvoice: { type: String, set: toPascalString },
    IsWorkshopPurchase: { type: String, set: toPascalString },
    IsSpareTransit: { type: String, set: toPascalString },
    IsWorkshopSales: { type: String, set: toPascalString },
    IsMechanics: { type: String, set: toPascalString },
    IsJobCard: { type: String, set: toPascalString },
    IsEInvoice: { type: String, set: toPascalString },
    IsInquiry: { type: String, set: toPascalString },
    IsSHWFinance: { type: String, set: toPascalString },
    IsSHWRTO: { type: String, set: toPascalString },
    IsSHWInsurance: { type: String, set: toPascalString },
    IsOldVehicle: { type: String, set: toPascalString },
    IsPaymentMade: { type: String, set: toPascalString },
    IsSave: { type: String, set: toPascalString },
    IsUpdate: { type: String, set: toPascalString },
    IsDelete: { type: String, set: toPascalString },
    IsPurchase: { type: String, set: toPascalString },
    IsSale: { type: String, set: toPascalString },
    IsAccount: { type: String, set: toPascalString },
}, { _id: false });

const userRoleSchema = new mongoose.Schema({
    RoleName: {
        type: String,
        required: true
    },
    Role: {
        type: rolePermissionsSchema,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        required: true
    },
}, { timestamps: true });

export default mongoose.model("UserRole", userRoleSchema);


