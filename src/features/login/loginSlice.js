import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInAccount: {}
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn: (state, { payload }) => {
            state.loggedInAccount = payload;
        },
        logOut: (state) => {
            state.loggedInAccount = {};
        }
    }
})

export default loginSlice.reducer;
export const { logIn, logOut } = loginSlice.actions;