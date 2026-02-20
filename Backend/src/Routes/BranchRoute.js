import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../Middleware/companyAuth.js";
import {
    Branchs,
    getBranch,
} from "../Controller/BranchController.js";


// get /branch
router.get("/get-branchs", isAuthenticated, getBranch)

// post /create
router.post("/branch", isAuthenticated, Branchs)


export default router;