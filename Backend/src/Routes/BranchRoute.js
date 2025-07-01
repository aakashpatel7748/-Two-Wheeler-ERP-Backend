import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../Middleware/adminAuth.js";
import {
    createBranch,
    getAllBranches,
    updateBranch,
    deleteBranch,
    getBranche
} from "../Controller/BranchController.js";

import { isAdmin } from "../Middleware/isAdmin.js"


// get /branch
router.get("/all-branchs", isAuthenticated, isAdmin("Admin"), getAllBranches)

// get /branch/:id
router.get("/branch/:id", isAuthenticated, isAdmin("Admin"), getBranche)

// post /create
router.post("/create", isAuthenticated, isAdmin("Admin"), createBranch)

// put /update
router.post("/update/:id", isAuthenticated, isAdmin("Admin"), updateBranch)

// delete /delete
router.post("/delete/:id", isAuthenticated, isAdmin("Admin"), deleteBranch)

export default router;