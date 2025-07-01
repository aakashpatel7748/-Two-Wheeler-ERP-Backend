import Router from "express"
const router = Router()
import {
    getAllUser,
    createuser,
    updateuser,
    deleteuser,
} from "../Controller/UserController.js";

import { isAuthenticated } from "../Middleware/adminAuth.js"
import { isAdmin } from "../Middleware/isAdmin.js";


// get /all
router.get("/all", isAuthenticated,isAdmin("Admin"), getAllUser)


// post /create
router.post("/create", isAuthenticated,isAdmin("Admin"), createuser)


// post /update/:id
router.post("/update/:id",isAuthenticated,isAdmin("Admin"),  updateuser)

// post /delete/:id
router.post("/delete/:id",isAuthenticated,isAdmin("Admin"),  deleteuser)


export default router;