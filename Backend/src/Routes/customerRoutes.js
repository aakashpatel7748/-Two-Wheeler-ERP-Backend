import Router from 'express';
const router = Router()
import { isAuthenticated } from '../Middleware/companyAuth.js';
import { createCustomer, getAllCustomers,  updateCustomers, deleteCustomers } from '../Controller/CustomerController.js';


// post /getAll
router.get("/get-all",isAuthenticated, getAllCustomers)

// post /create
router.post("/create",isAuthenticated,  createCustomer)

// post /update
router.post("/update/:id", isAuthenticated, updateCustomers)

// post /delete
router.post("/delete/:id", isAuthenticated, deleteCustomers)

export default router;
