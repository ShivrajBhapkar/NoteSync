import React from "react";

const Button = ({ onClick, label, action }) => {
    // Define predefined styles for each action
    const buttonStyles = {
        primary:"w-full bg-blue-500 text-white font-bold rounded-md py-2 px-4 mb-2 ml-2",
        secondary:"w-full  border border-red-400 text-red-400 font-bold rounded-md py-2 px-4 mb-2 ml-2",
        normal:"w-full bg-gray-400 text-black font-bold rounded-md py-2 px-4 mb-2 ml-2", // Style for "normal" action
    };

    // Determine the style based on the action prop
    const styleClasses = buttonStyles[action] || "normal"; // Default to an empty string if the action is not recognized

    return (
        <button onClick={onClick} className={styleClasses}>
            {label}
        </button>
    );
};

export default Button;
