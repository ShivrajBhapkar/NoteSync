import React from "react";
import axios from "../axios-config";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import TokenService from "../Services/token.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
    const navigate = useNavigate();
    const userId = useSelector((store) => store.authentication.userId);
    if (userId !== null) {
        return <Navigate to="/" replace />;
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(5, "Name must be at least 5 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Password must contain at least 8 characters with one special character"
            )
            .required("Password is required"),
    });

    const handleRegister = async (values) => {
        try {
            const response = await axios.post("/auth/register", values);

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
            <section className="w-96 flex flex-col space-y-4 p-4 rounded-lg shadow-md">
                <div className="text-center text-2xl font-medium">Register</div>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                    validateOnMount
                >
                    {({ isValid, dirty, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </label>
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-4 text-black py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                className={`${
                                    !isValid || !dirty || isSubmitting
                                        ? "opacity-50 pointer-events-none bg-blue-300"
                                        : "bg-blue-500 hover:bg-blue-700 text-white"
                                } px-4 py-2 rounded-md w-full`}
                            >
                                REGISTER
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-indigo-500 hover:underline p-2"
                    >
                        Log In
                    </a>
                </p>
            </section>
        </main>
    );
}

export default Register;
