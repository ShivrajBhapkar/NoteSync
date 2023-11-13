import React from "react";
const GenericModal = ({ title, subtitle, label, action }) => {
    return (
        <div className="p-4 border mx-auto max-w-rem-600 text-center rounded-md shadow-lg">
            <h3 className="text-xl font-bold">Oh no!</h3>
            <p className="mt-2">{title}</p>
            <p>{subtitle}</p>
            {label && action ? (
                <button
                    className="mx-auto mt-4 bg-blue-500 text-white rounded-full px-4 py-2"
                    onClick={action}
                >
                    {label}
                </button>
            ) : null}
        </div>
    );
};

export default GenericModal;
