import { Router } from "express";
import { isAuthenticated } from "../Middleware/adminAuth.js";
import {
    getAllEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployees

} from "../Controller/EmployeeController.js";
import { isAdmin } from "../Middleware/isAdmin.js";

const router = Router();

// get all employee
router.get("/all", isAuthenticated, isAdmin("Admin"), getAllEmployees)

// post /create
router.post("/create", isAuthenticated, isAdmin("Admin"), createEmployees)

// post /update
router.post("/update/:id", isAuthenticated, isAdmin("Admin"), updateEmployees)

// post /delete
router.post("/delete/:id", isAuthenticated, isAdmin("Admin"), deleteEmployees)

export default router;