import express from "express";
import {
  createPurchaseStock,
  getAllPurchaseStock,
} from "../Controllers/Stock/purchaseController.js";
import { isAuthenticated } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/purchase", isAuthenticated, createPurchaseStock);
router.get("/purchase", isAuthenticated, getAllPurchaseStock);

export default router;
