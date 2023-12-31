import React from "react";
import { Link } from "react-router-dom";



export const ButtonLink = ({
    to,
    color = "primary",
    stretch = false,
    className = "",
    children,
}) => (
    <Link
        to={to}
        className={`rounded-md py-3 px-6 font-semibold text-lg text-center ${
            color === "primary"
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-indigo-600 hover:bg-gray-50"
        } ${!stretch && "max-w-max"} ${className}`}
    >
        {children}
    </Link>
);
