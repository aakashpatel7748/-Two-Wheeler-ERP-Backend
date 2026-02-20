import { Router } from "express";
import { isAuthenticated } from "../Middleware/companyAuth.js";
import {
    getUserRole,
    UserRoles,
    assignBranch,
    AccountControllers
} from "../Controller/UserController.js";

const router = Router();

// get /get-user-role
router.get("/get-user-role", isAuthenticated, getUserRole)

// post /assign-branch
router.post("/assign-branch", isAuthenticated, assignBranch)

// post /create
router.post("/user-role", isAuthenticated, UserRoles)

// admin acount Routes

// admin get /get-account
router.get("/get-account", isAuthenticated, AccountControllers)

// admin get /get-account
router.post("/account", isAuthenticated, AccountControllers)

export default router;
