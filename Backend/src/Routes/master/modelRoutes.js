import Router from 'express';
import { isAuthenticated } from '../../Middleware/adminAuth.js';
import { isAdmin } from '../../Middleware/isAdmin.js';
const router = Router();
import { createModel, getAllModels } from "../../Controller/master/ModelController.js"

// get /getAll
router.get("/getAll", isAuthenticated, isAdmin("Admin"), getAllModels)

// post /create
router.post("/create", isAuthenticated, isAdmin("Admin"), createModel)

export default router;