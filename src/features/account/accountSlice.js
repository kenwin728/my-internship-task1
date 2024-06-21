import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
    accounts: []
}


const accountSlice = createSlice ({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, { payload }) => {
            const account = {
                accountName: payload.name,
                mobileNumber: payload.mobileNumber,
                email: payload.email,
                address: payload.address,
                gender: payload.gender,
                password: payload.password,
                birthDate: payload.birthDate
            }
            state.accounts = [...state.accounts, account];
            const jsonString = JSON.stringify(state.accounts);
            localStorage.setItem('accounts', jsonString);
            console.log(localStorage.getItem('accounts'));
        },
        getAccounts: (state) => {
            // localStorage.clear();
            const jsonString = localStorage.getItem('accounts');
            if (jsonString) {
                state.accounts = JSON.parse(jsonString);
            }
            console.log(localStorage.getItem('accounts'));
        }
    },
})



export const { addAccount, getAccounts } = accountSlice.actions;
export default accountSlice.reducer;