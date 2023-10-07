// axios-config.js
import axios from "axios";
// Create an instance of Axios with default configuration
const instance = axios.create({
    baseURL: "http://localhost:3000/v1", // Your API base URL
});

const accessToken = JSON.parse(localStorage.getItem("User")).accessToken
instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
    (error) => {
        // Handle errors globally
        // For example, you can redirect to an error page or display a message
        return Promise.reject(error);
    }
);

export default instance;
