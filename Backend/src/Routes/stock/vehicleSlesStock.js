import express from "express";
import {
  createVehicleSale,
  getAllVehicleSales,
} from "../../Controller/Sales/vehicleSalesController.js";
import { isAuthenticated } from "../../Middleware/companyAuth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createVehicleSale);
router.get("/all", isAuthenticated, getAllVehicleSales);

export default router;
