import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../Services/auth";
const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Use the useNavigate hook
    const userId = useSelector((store) => store.authentication.userId);

    if (userId !== null) {
        return <Navigate to="/" replace />;
    }
    const handleLogin = async() => {
        await login(email, password);
        navigate("/")
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
