import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../Services/auth";
const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const userId = useSelector((store) => store.authentication.userId);

    if (userId !== null) {
        return <Navigate to="/" replace />;
    }
    const handleLogin = async() => {
        await login(email, password);
        navigate("/")
    };

    return (    
            <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
                <section className="flex w-[30rem] flex-col space-y-10">
                    <div className="text-center text-4xl font-medium">
                        Log In
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
                        />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                    >
                        LOG IN
                    </button>

                    {/* <a
                        href="#"
                        className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
                    >
                        FORGOT PASSWORD?
                    </a> */}

                    <p className="text-center text-lg">
                        No account?
                        <a
                            href="/register"
                            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
                        >
                            Create One
                        </a>
                    </p>
                </section>
            </main>
    )
};

export default LoginComponent;
