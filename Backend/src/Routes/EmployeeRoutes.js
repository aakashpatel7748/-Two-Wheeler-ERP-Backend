import { Router } from "express";
import { isAuthenticated } from "../Middleware/companyAuth.js";
import {
    employe,
    getEmployees
} from "../Controller/EmployeeController.js";

const router = Router();

// get /get-employees
router.get("/get-employees", isAuthenticated, getEmployees)

// post /create
router.post("/employe", isAuthenticated, employe)



export default router;