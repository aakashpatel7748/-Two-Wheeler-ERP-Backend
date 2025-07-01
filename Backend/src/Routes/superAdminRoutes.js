import Router from 'express';
import { isAuthenticated } from '../Middleware/adminAuth.js';
const router = Router();
import {superAdminContoller} from '../Controller/superAdminController.js';

// get /admin   currentUser
router.get("/admin", isAuthenticated, superAdminContoller);

// post /admin/signup
router.post("/admin/signup", superAdminContoller);

// post /admin/signin
router.post("/admin/signin", superAdminContoller);

// get /admin/logout
router.get("/admin/logout", isAuthenticated, superAdminContoller);

export default router;