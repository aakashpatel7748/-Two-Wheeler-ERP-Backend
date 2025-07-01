import { Companies, Error, Loading } from "../slice/companySlice.js";
import axios from "../../api/axios.js"

export const asyncGetCompanys = () => async (dispatch, getState) => {
    dispatch(Loading(true))
    try {
        const { data } = await axios.get("/company/all");
        console.log(data)
        dispatch(Companies(data.companies))
        dispatch(Error(null))
        console.log("company get successfull!")

    } catch (error) {
        console.log("companyAction : asyncgetCompany error::", error)
    }
}

export const asyncCreateCompanys = (companyData) => async (dispatch, getState) => {
    try {
        const data = await axios.post("/company/create", companyData);
        dispatch(asyncGetCompanys())
        console.log("company created successfull!")

    } catch (error) {
        console.log("companyAction : asyncCreateCompany error::", error)
    }
}