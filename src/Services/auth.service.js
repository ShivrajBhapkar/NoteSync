// auth.js

import axios from "axios";
import { login, logout } from "./store/authSlice";
import TokenService from "./token.service";
const login = async (email, password) => {
    try {
        const response = await axios.post("/api/login", { username, password });
        // Dispatch action to set tokens and user in Redux store
        dispatch(login(response.data));
        // Dispatch action to set user in Redux store if needed
        dispatch(setUser(response.data.user));
        return response.data;
    } catch (error) {
        // Handle login error
    }
    try {
        const response = await axios.post("/auth/login", {
            email,
            password,
        });

        if (response.status === 200) {
            const { tokens, user } = response.data;
            const accessToken = tokens.access.token;
            const refreshToken = tokens.refresh.token;
            const userId = user.id;

            if (accessToken && refreshToken && userId) {
                // Dispatch the login action to set the authentication state
                dispatch(login({ accessToken, refreshToken, userId }));
                 const userObject = {
                     accessToken: action.payload.accessToken,
                     refreshToken: action.payload.refreshToken,
                     userId: action.payload.userId,
                 };
                // Redirect to the root page ("/") after a successful login
                navigate("/");
            } else {
                console.error("Invalid tokens or user ID");
            }
        } else {
            console.error("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};

const logout = async () => {
    // Implement your logout logic here, e.g., clearing tokens from local storage and dispatch logout action
    dispatch(logout());
};

// Rest of the auth.js code remains the same
