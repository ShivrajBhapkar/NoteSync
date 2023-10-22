
import React, { useState, useEffect } from "react";
const EditNoteModal = ({
    isOpen,
    onClose,
    initialText,
    initialTitle,
    initialTimestamp,
    onSave,
}) => {
    const [text, setText] = useState(initialText);
    const [title, setTitle] = useState(initialTitle);
    console.log(title);
    const handleSave = () => {
        onSave(text || initialText, initialTimestamp, title || initialTitle); // Pass both text and timestamp to the onSave function
        onClose();
    };
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit Note</h2>
                    <div className="flex">
                        <input
                            defaultValue={initialTitle}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            defaultValue={initialText}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    );
};
export default EditNoteModal;