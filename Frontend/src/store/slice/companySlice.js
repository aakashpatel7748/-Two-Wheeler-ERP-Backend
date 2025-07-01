import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    company: [],
    loading: false,
    error: null
}

const companySlice = createSlice({
    name: "company",
    initialState,

    reducers: {
        Companies: (state, action) => {
            state.companies = action.payload
        },
        Loading: (state, action) => {
            state.loading = action.payload
        },
        Error: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {Companies, Loading, Error} = companySlice.actions;
export default companySlice.reducer;