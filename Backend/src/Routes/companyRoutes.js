import { Router } from 'express';
import { isAuthenticated } from '../Middleware/companyAuth.js';
const router = Router();
import { companyContoller, forgetPassword, avatar } from '../Controller/CompanyController.js';


// post /compony/signup
router.post("/signup", companyContoller);

// post /compony/signin
router.post("/signin", companyContoller);

// get /compony/getCompanyDetails
router.get("/getCompanyDetails", isAuthenticated, companyContoller);

// post /compony/update
router.post("/update/:id", isAuthenticated, companyContoller);

// post /compony/forget-password
router.post("/forget-password", companyContoller);

// post /compony/forget-password
router.get("/forget-password/:id", forgetPassword);

// post /compony/resett-password
router.post("/reset-password/:id", isAuthenticated, companyContoller);

// post /compony/avatar
router.post("/avatar/:id", isAuthenticated, avatar);

// get /compony/logout
router.post("/logout", isAuthenticated, companyContoller);

export default router;