import express from "express";
import {
  createPurchaseStock,
  getAllPurchaseStock,
  deletePurchaseStock,
  updatePurchaseStock
} from "../../Controller/stock/purchaseController.js";
import { isAuthenticated } from "../../Middleware/companyAuth.js";

const router = express.Router();

// stock/purchase/get-all
router.get("/purchase/get-all", isAuthenticated, getAllPurchaseStock);

// stock/purchase/create
router.post("/purchase/create", isAuthenticated, createPurchaseStock);

// stock/purchase/update
router.post("/purchase/update/:id", isAuthenticated, updatePurchaseStock);

// stock/purchase/delete
router.post("/purchase/delete/:id", isAuthenticated, deletePurchaseStock);

export default router;
