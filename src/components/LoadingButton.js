import React from "react";

const LoadingButton = ({ loading, text, Action }) => {
    const handleButtonClick = () => {
        if (Action && !loading) {
            Action();
        }
    };

    return (
        <button
            className={`bg-blue-300 text-black font-bold rounded-md py-2 px-4 relative z-10 ${
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
