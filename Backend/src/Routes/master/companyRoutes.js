import Router from 'express';
const router = Router()
import { isAuthenticated } from '../../Middleware/adminAuth.js';
import {
    createCompany,

} from "../../Controller/master/CompanyController.js"

// get /all-company
router.get("/all", isAuthenticated, createCompany)

// post /create
router.post("/create", isAuthenticated, createCompany)

// post /update
router.post("/update/:id", isAuthenticated, createCompany)

// post /create
router.post("/delete/:id", isAuthenticated, createCompany)

export default router;