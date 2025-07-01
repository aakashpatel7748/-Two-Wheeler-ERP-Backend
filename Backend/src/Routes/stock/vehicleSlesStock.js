import express from "express";
import {
  createVehicleSale,
  getAllVehicleSales,
} from "../Controllers/Sales/vehicleSalesController.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/vehicle", isAuthenticated, createVehicleSale);
router.get("/vehicle", isAuthenticated, getAllVehicleSales);

export default router;
