import express from 'express';

// routes import!
import BranchRoutes from "../src/Routes/BranchRoute.js";
import EmployeeRoutes from "../src/Routes/EmployeeRoutes.js"
import ModelRoutes from "../src/Routes/master/modelRoutes.js"
import CustomerRoutes from "../src/Routes/customerRoutes.js"
import CompanyRoutes from "../src/Routes/companyRoutes.js"
import purchesStock from "../src/Routes/stock/purcheaseStockRoutes.js"
import currentStock from "../src/Routes/stock/currentStockRoutes.js"
import vehicleSles from "../src/Routes/stock/vehicleSlesStock.js"
import adminUserRoutes from "../src/Routes/user.js"
import commanRoutes from "../src/Routes/comman.js"

import cookieParser from 'cookie-parser';
import cors from "cors"
import fileUpload from "express-fileupload"
import ErrorHendler from './utils/ErrorHendler.js';
import { genetatedErrors } from './Middleware/errors.js';


const app = express();

// Request Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors({
    origin: "http://localhost:3000", // Your frontend
    credentials: true
}))
// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-fileupload
app.use(fileUpload())

// Importing routes

app.use("/company", CompanyRoutes)
app.use("/branch", BranchRoutes);
app.use("/employee", EmployeeRoutes)
app.use("/customer", CustomerRoutes)

// admin user routes
app.use("/api/admin/", adminUserRoutes)

// stock
app.use("/stock", purchesStock)
app.use("/stock", currentStock)
app.use("/stock/vehicle-sale", vehicleSles)

app.use("/model", ModelRoutes)

// comman routes
app.use("/api/comman", commanRoutes)

app.use((req, res, next) => {
    next(new ErrorHendler(`Route not found: ${req.originalUrl}`, 404));
});

app.use(genetatedErrors)


export default app;