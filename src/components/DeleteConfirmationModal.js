import React from "react";
import Button from "./ui/Button";
const DeleteConfirmationModal = ({
    isOpen,
    onSave,
    onClose,
    selectedNoteToDelete,
}) => {
    const handleSave = () => {
        onSave(selectedNoteToDelete);
        onClose();
    };

    return (
        isOpen && (
            <div className=" w-full h-full flex z-50">
                <div className="modal max-w-lg bg-white p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                        Confirm Deletion
                    </h2>
                    <p className="mb-4">
                        Are you sure you want to delete this note permanently?
                    </p>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            onClick={handleSave}
                            label="Delete"
                            action="secondary"
                        />
                        <Button
                            onClick={onClose}
                            label="Cancel"
                            action="primary"
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteConfirmationModal;
