import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    userId: localStorage.getItem("userId") || null,
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;

            // Store in local storage
          
            localStorage.setItem(
                "accessToken",
                JSON.stringify(action.payload.accessToken)
            );
            localStorage.setItem(
                "refreshToken",
                JSON.stringify(action.payload.refreshToken)
            );
            localStorage.setItem(
                "userId",
                JSON.stringify(action.payload.userId)
            );
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = null;

            // Remove from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
        },
    },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
