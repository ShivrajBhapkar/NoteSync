import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../Services/auth";
import TokenService from "../Services/token.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const LoginComponent = () => {
    const user = TokenService.getUser();
    const navigate = useNavigate();
    if (user && user.userId) {
        return <Navigate to="/" replace />;
    }
    const handleLogin = async (values) => {
        await login(values);
        navigate("/dashboard");
    };
    const validationSchema = Yup.object().shape({
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

    return (
        <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <section className="w-96 flex flex-col space-y-4 p-4 rounded-lg shadow-md">
                <div className="text-center text-4xl font-medium">Log In</div>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                    validateOnMount
                >
                    {({ isValid, dirty, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="w-full ">
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
                                    className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="w-full">
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
                                LOG IN
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-center text-sm">
                    No account?
                    <a
                        href="/register"
                        className="font-medium text-indigo-500 underline-offset-4 hover:underline p-2"
                    >
                        Create One
                    </a>
                </p>
            </section>
        </main>
    );
};

export default LoginComponent;
