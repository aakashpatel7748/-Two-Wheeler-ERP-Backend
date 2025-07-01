import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    admin: null
}

const createAdmin = createSlice({

    name: "admin",
    initialState,

    reducers: {
        login: (state, action) => {
            console.log("login reduser----->>", action.payload)
            state.status = true
            state.admin = action.payload
        },
        logout: (state, action) => {
            state.status = false
            state.admin = null
        }
    }
})

export const { login, logout } = createAdmin.actions;
export default createAdmin.reducer;
