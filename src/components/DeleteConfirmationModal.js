import React from "react";

const DeleteConfirmationModal = ({
    isOpen,
    onSave,
    onClose,
    onConfirm,
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
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleSave}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteConfirmationModal;
