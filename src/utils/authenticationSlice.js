import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    accessToken: JSON.parse(localStorage.getItem("User")).accessToken|| null,
    refreshToken:JSON.parse(localStorage.getItem("User")).refreshToken || null,
    userId: JSON.parse(localStorage.getItem("User")).userId|| null,
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;

            // Store in local storage

            const userObject = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                userId: action.payload.userId,
            };

            localStorage.setItem("User", JSON.stringify(userObject));
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = null;

            // Remove from local storage
            localStorage.removeItem("User");
        },
    },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
