import Router from 'express';
import { isAuthenticated } from '../../Middleware/companyAuth.js';
const router = Router();
import { createModel, getAllModels } from "../../Controller/master/ModelController.js"

// get /getAll
router.get("/getAll", isAuthenticated,  getAllModels)

// post /create
router.post("/create", isAuthenticated,  createModel)

export default router;
