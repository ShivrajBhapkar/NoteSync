// LoginComponent.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../utils/authenticationSlice";
import { useSelector } from "react-redux";
import axios from "../axios-config";
import { useNavigate , Navigate} from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook
    const userId = useSelector((store) => store.authentication.userId);

    if (userId) {
      return <Navigate to="/" replace/>
    }
    const handleLogin = async () => {
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

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginComponent;
