import Router from 'express';
import { isAuthenticated } from '../Middleware/adminAuth.js';
const router = Router();
import {
     adminsignup,
     adminsignin,
     adminlogout,
     currentUser

} from '../Controller/adminContoller.js';

// get /admin   currentUser
router.get("/admin", isAuthenticated, currentUser);

// post /admin/signup
router.post("/admin/signup", adminsignup);

// post /admin/signin
router.post("/admin/signin", adminsignin);

// get /admin/logout
router.get("/admin/logout", isAuthenticated, adminlogout);

export default router;
