
import React, { useState, useEffect } from "react";
const EditNoteModal = ({
    isOpen,
    onClose,
    initialText,
    initialTimestamp,
    onSave,
}) => {
    const [text, setText] = useState(initialText);
    const handleSave = () => {
        onSave(text, initialTimestamp); // Pass both text and timestamp to the onSave function
        onClose();
    };
console.log("intial text" , initialText)
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit Note</h2>
                    <textarea
                        defaultValue={initialText}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    );
};
export default EditNoteModal;