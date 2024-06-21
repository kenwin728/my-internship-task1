import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './features/account/accountSlice';
import loginReducer from './features/login/loginSlice';

export const store = configureStore ({
    reducer: {
        account: accountReducer,
        login: loginReducer
    },
});