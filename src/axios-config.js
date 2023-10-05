// axios-config.js
import axios from "axios";

// Create an instance of Axios with default configuration
const instance = axios.create({
    baseURL: "http://localhost:3000/v1", // Your API base URL
});
const yourToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE4MjBkYTg1Zjg3Zjc2ZDQ2N2E2ZjQiLCJpYXQiOjE2OTY1Mjc5NTYsImV4cCI6MTY5NjcwMDc1NiwidHlwZSI6ImFjY2VzcyJ9.jJGxCrpf3RI1nfyaZ7g1tU3Uyj3YFnPwIqZurjrThXk";

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${yourToken}`;
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
