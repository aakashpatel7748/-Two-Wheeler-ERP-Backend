import express from 'express';

// routes import!
import AdminRoutes from "../src/Routes/adminRoutes.js"
import BranchRoutes from "../src/Routes/BranchRoute.js";
import EmployeeRoutes from "../src/Routes/EmployeeRoutes.js"
import UserRoutes from "../src/Routes/UserRoutes.js"
import CompanyRoutes from "../src/Routes/master/companyRoutes.js"
import ModelRoutes from "../src/Routes/master/modelRoutes.js"
import CustomerRoutes from "../src/Routes/master/customerRoutes.js"
import superAdmin from "../src/Routes/superAdminRoutes.js"

import cookieParser from 'cookie-parser';
import cors from "cors"


const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Your frontend
    credentials: true
}))
// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing routes
app.use("/user", AdminRoutes);
app.use("/branch", BranchRoutes);
app.use("/employee", EmployeeRoutes)
app.use("/users", UserRoutes)

// master routes
app.use("/super", superAdmin)
app.use("/company", CompanyRoutes)
app.use("/model", ModelRoutes)
app.use("/customer", CustomerRoutes)

// stock routes
// app.use("pu")

export default app;