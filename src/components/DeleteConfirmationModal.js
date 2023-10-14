import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Confirm Deletion</h2>
                    <p>
                        Are you sure you want to delete this note permanently?
                    </p>
                    <div className="modal-buttons">
                        <button onClick={onConfirm}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteConfirmationModal;
