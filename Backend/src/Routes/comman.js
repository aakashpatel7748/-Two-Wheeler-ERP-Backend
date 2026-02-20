import { Router } from "express";
import { isAuthenticated } from "../Middleware/companyAuth.js";
import { getDropdownDetails, getDropdownList } from "../Controller/comman.js";


const router = Router();
router.get("/get-dropdown-list", isAuthenticated, getDropdownList);
router.get("/get-dropdown-details", isAuthenticated, getDropdownDetails);

"/api/comman/get-report-dropdown-list",

    "/api/comman/change-session",
    "/api/admin/dashboard-alert",
    "/api/comman/get-indexing",
    "/api/comman/indexing",

    "/api/additional-db/autocomplete",
    "/api/additional-db/get-item-details",

    "/api/additional-db/look-up-autocomplete",
    "/api/additional-db/get-look-up-item-details",

    "/api/comman/get-profile",

    "/api/print"

export default router
