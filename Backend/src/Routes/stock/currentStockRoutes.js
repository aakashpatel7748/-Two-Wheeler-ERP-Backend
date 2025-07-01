import Router from 'express';
const router = Router()
import { isAuthenticated } from '../../Middleware/adminAuth.js';
import{isAdmin} from "../../Middleware/isAdmin.js"
import {
    currentStock,
    getAllStock

} from "../../Controller/stock/currentStockController.js"

// get /all-company
router.get("/getsotck",isAuthenticated, isAdmin("Admin"), currentStock )

// post /create
router.get("/getAllStock",isAuthenticated, isAdmin("Admin"), getAllStock )

export default router;