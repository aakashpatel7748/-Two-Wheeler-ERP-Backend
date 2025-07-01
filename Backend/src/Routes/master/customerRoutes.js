import Router from 'express';
const router = Router()
import { isAuthenticated } from '../../Middleware/adminAuth.js';
import{isAdmin} from "../../Middleware/isAdmin.js"
import {
    createcustomer,
    getAllCustomer

} from "../../Controller/master/CustomerController.js"


// post /getAll
router.get("/getAll",isAuthenticated, isAdmin("Admin"),  getAllCustomer)

// post /create
router.post("/create",isAuthenticated, isAdmin("Admin"),  createcustomer)

export default router;