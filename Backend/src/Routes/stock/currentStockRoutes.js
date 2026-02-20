import Router from 'express';
const router = Router()
import { isAuthenticated } from '../../Middleware/companyAuth.js';
import {
    currentStock,
    getAllStock,
 } from "../../Controller/stock/currentStockController.js"

// post /getAllStock
router.get("/getAllStock", isAuthenticated, getAllStock)

// get /current
router.get("/current", isAuthenticated, currentStock)



export default router;
