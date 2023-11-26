import React from "react";
import Button from "./Button";
const AlertModel = ({ onConfirm, onCancel, label, sublabel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="modal-overlay fixed inset-0 bg-gray-600 opacity-50"></div>
            <div className="modal-container bg-white sm:w-1/2 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-8 relative">
                <p className="text-lg mb-4 text-gray-800">{label}</p>
                {sublabel && (
                    <p className="text-sm mb-4 text-gray-800">{sublabel}</p>
                )}
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                    <Button
                        onClick={onConfirm}
                        label="Confirm"
                        action="secondary"
                    />
                    <Button
                        onClick={onCancel}
                        label="Cancel"
                        action="primary"
                    />
                </div>
            </div>
        </div>
    );
};
export default AlertModel;
