import React from "react";

const LoadingButton = ({ loading, text, Action }) => {
    const handleButtonClick = () => {
        if (Action && !loading) {
            Action();
        }
    };

    return (
        <button
            className={`bg-blue-500 text-white font-bold rounded-md py-2 px-4 mb-2 ml-2 relative z-10 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            onClick={handleButtonClick}
        >
            <div className="button-content">
                <span>{text}</span>
                {loading && <div className="spinner" />}
            </div>
        </button>
    );
};

export default LoadingButton;
