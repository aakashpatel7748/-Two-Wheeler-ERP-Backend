import axios from "../../api/axios.js";
import { login, logout } from "../slice/adminSlice.js";

export const asyncCurrentAdmin = () => async (dispatch, getState) => {
    try {
        const {data} = await axios.get("/user/admin");
       console.log("asyncsigninsadmin ",  data , data.admin,)

        if (data) {
            dispatch(login(data.admin))
            console.log("Session Restored!");
        } else {
            console.log("adminActin : asynccurrentuser :: error")
        }

    } catch (error) {
        console.log("Admin action asyncCurrentAdmin error ::", error)
    }

}

export const asyncSignupAdmin = (admin) => async (dispatch, getState) => {
    try {
        await axios.post("/user/admin/signup", admin)
        console.log("admin ragister!")

    } catch (error) {
        console.log("Admin action asyncSignup error ::", error)
    }

}

export const asyncSigninAdmin = (admin) => async (dispatch, getState) => {
    try {
       const {data} =  await axios.post("/user/admin/signin", admin)
        dispatch(asyncCurrentAdmin())
        dispatch(login(data.admin))
        console.log("admin login!")

    } catch (error) {
        console.log(error)
    }

}

export const asyncLogoutAdmin = () => async (dispatch, getState) => {
    try {
        await axios.get("/user/admin/logout")
        dispatch(logout())
        console.log("admin logout!")

    } catch (error) {
        console.log(error)
    }

}


export const asyncUpdateAdmin = (id, admin) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`/user/admin/update/${id}`, admin)
        dispatch(asynccurrentuser({ data }))
        console.log("admin updated successfull!")

    } catch (error) {
        console.log(error)
    }

}


