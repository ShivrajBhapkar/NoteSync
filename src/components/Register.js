import React, { useState } from "react";
import axios from "../axios-config"
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import TokenService from "../Services/token.service";
function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const userId = useSelector((store) => store.authentication.userId);

 if (userId !== null) {
     return <Navigate to="/" replace />;
 }
   const handleRegister = async (e) => {
       e.preventDefault();
       const userData = { name, email, password };

       try {
           const response = await axios.post("/auth/register", userData);

           if (response.status === 201) {
               const { tokens, user } = response.data;
               const accessToken = tokens.access.token;
               const refreshToken = tokens.refresh.token;
               const userId = user.id;

               if (accessToken && refreshToken && userId) {
                   const userObject = {
                       accessToken: accessToken,
                       refreshToken: refreshToken,
                       userId: userId,
                   };
                   TokenService.setUser(userObject);
               } else {
                   console.error("Invalid tokens or user ID");
               }
                navigate("/");
           } else {
               console.error("Registration failed");
           }
       } catch (error) {
           console.error("Error:", error);
       }
   };

    return (
        <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <section className="flex w-[30rem] flex-col space-y-10">
                <div className="text-center text-4xl font-medium">Register</div>

                <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
                    />
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
                    onClick={handleRegister}
                    className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
                >
                    REGISTER
                </button>

                <p className="text-center text-lg">
                    Already have an account?
                    <a
                        href="/login"
                        className="font-medium text-indigo-500 underline-offset-4 hover:underline"
                    >
                        Log In
                    </a>
                </p>
            </section>
        </main>
    );
}

export default Register;