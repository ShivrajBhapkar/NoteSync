import React, { useState, useEffect } from "react";

const EditNoteModal = ({
    isOpen,
    onClose,
    NoteId,
    initialText,
    initialTitle,
    initialTimestamp,
    onSave,
}) => {
    const [text, setText] = useState(initialText);
    const [title, setTitle] = useState(initialTitle);

    const handleSave = () => {
        onSave(
            NoteId,
            text || initialText,
            initialTimestamp,
            title || initialTitle
        );
        onClose();
    };

        return (
            isOpen && (
                <div className="flex items-center justify-center">
                    <div className="bg-white w-96 p-4 rounded shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Edit Note</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-full border rounded px-2 py-1"
                                defaultValue={initialTitle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="w-full border rounded px-2 py-1"
                                defaultValue={initialText}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                onClick={handleSave}
                            >
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12.69l-1.41-1.41-1.42 1.42 2.83 2.83 7.42-7.42-1.42-1.41-6 6z" />
                                </svg> */}
                                Save
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={onClose}
                            >
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59z" />
                                </svg> */}
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )
        );

};

export default EditNoteModal;
