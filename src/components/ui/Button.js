import React from "react";

const Button = ({ onClick, label, action }) => {
    // Define predefined styles for each action
    const buttonStyles = {
        primary:
            "w-full max-w-md bg-blue-500 text-white font-bold rounded-md lg:py-2 xl:py-2 md:py-2 lg:px-4 xl:px-4 md:px-4 mb-2 md:ml-2 lg:ml-2 xl:ml-2 px-4 py-2 pl-0 ",
        secondary:
            "w-full max-w-md  border border-red-400 text-red-400 font-bold rounded-md lg:py-2 xl:py-2 md:py-2 lg:px-4 xl:px-4 md:px-4 mb-2 md:ml-2 lg:ml-2 xl:ml-2 px-4 py-2 pl-0 ",
        normal: "w-full max-w-md bg-gray-400 text-black font-bold rounded-md py-2 px-4 mb-2 ml-2", // Style for "normal" action
    };

    // Determine the style based on the action prop
    const styleClasses = buttonStyles[action] || "normal";

    return (
        <button onClick={onClick} className={styleClasses}>
            {label}
        </button>
    );
};

export default Button;
