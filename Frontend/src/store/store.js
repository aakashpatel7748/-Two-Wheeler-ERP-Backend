import { configureStore } from "@reduxjs/toolkit"
import createAdmin from "../store/slice/adminSlice.js"
import companySlice from "../store/slice/companySlice.js"

export const store = configureStore({
    reducer:{
       creatAdmin:createAdmin,
       company:companySlice,
    }
})