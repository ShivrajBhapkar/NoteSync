
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/v1", // Your API base URL
});



const refreshToken = async () => {
    try {
        const refreshToken = JSON.parse(
            localStorage.getItem("User")
        ).refreshToken;
        const response = await axios.post(
            "http://localhost:3000/v1/auth/refresh-tokens",
            {
                refreshToken: refreshToken,
            }
        );

        if (response.status === 200) {
            const { access, refresh } = response.data;
            const newAccessToken = access.token;
            const newRefreshToken = refresh.token;

            // Update the user object in local storage
            const existingUser = JSON.parse(localStorage.getItem("User"));
            existingUser.accessToken = newAccessToken;
            existingUser.refreshToken = newRefreshToken;
            localStorage.setItem("User", JSON.stringify(existingUser));

            // Update the axios instance with the new access token
            instance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // Retry the original request that triggered the token expiration
              return instance.request(response.config);
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
        if (error.response && error.response.status === 401) {
            // Handle token expiration here
            // Attempt to refresh the access token
            try {
                const originalRequest = error.config;

                // Make sure this is the first request to handle token expiration
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshedResponse = await refreshToken();
                    return refreshedResponse;
                }
            } catch (refreshError) {
                console.error("Error handling token expiration:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
