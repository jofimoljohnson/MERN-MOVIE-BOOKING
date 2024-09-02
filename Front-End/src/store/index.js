import { createSlice,configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem("userId")
        },
    },
});

const adminSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers:{
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem("adminId")
            localStorage.removeItem("token")
        },

    }
});



export const userActins = userSlice.actions;
export const adminActions=adminSlice.actions


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin:adminSlice.reducer
    },
});
