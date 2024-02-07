import React from "react";
const NoteCard = ({ title, text, onClose}) => {
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="max-w-screen-sm w-full bg-gray-300 p-4 rounded shadow-lg">
                <div>
                    <h2 className="text-gray-800 text-3xl font-semibold text-center pb-2">
                        {title}
                    </h2>
                    <div className="max-w-full flex-wrap p-6">
                        <p
                            className="flex-grow"
                            style={{ wordWrap: "break-word" }}
                            dangerouslySetInnerHTML={{
                                __html: text,
                            }}
                        ></p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
