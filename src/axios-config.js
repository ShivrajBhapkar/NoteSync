import axios from "axios";
import { Navigate } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";

const instance = axios.create({
    baseURL:
        "http://localhost:3001/v1", // Your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshToken = async () => {
    try {
        const refreshToken = JSON.parse(
            localStorage.getItem("User")
        ).refreshToken;
        const user = JSON.parse(localStorage.getItem("User"));
        const response = await axios.post(
            "https://notesync-7yna.onrender.com/v1/auth/refresh-tokens",
            {
                refreshToken: refreshToken,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            const { access, refresh } = response.data;
            const newAccessToken = access.token;
            const newRefreshToken = refresh.token;
            const existingUser = JSON.parse(localStorage.getItem("User"));
            existingUser.accessToken = newAccessToken;
            existingUser.refreshToken = newRefreshToken;
            localStorage.setItem("User", JSON.stringify(existingUser));
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newAccessToken}`;
        }
    } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
    }
};
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("User"));
        if (user && user.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add response interceptor
instance.interceptors.response.use(
    (response) => {
        // Modify the response data or do something with it
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (originalConfig.url !== "/auth/login" && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                // Handle token expiration here
                // Attempt to refresh the access token
                originalConfig._retry = true;
                try {
                    // Make sure this is the first request to handle token expiration
                    await refreshToken();
                    return instance(originalConfig);
                    // return axiosInstance(originalConfig);
                } catch (refreshError) {
                    console.error(
                        "Error handling token expiration:",
                        refreshError
                    );
                    <Navigate to={<LoginComponent />} />;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
