import React from "react";

const NoteCard = ({
    title,
    text,
    onClose,
    maxCharactersPerParagraph = 50,
}) => {
    const paragraphs = [];
    let textRemaining = text;

    while (textRemaining.length > 0) {
        const paragraph = textRemaining.slice(0, maxCharactersPerParagraph);
        paragraphs.push(paragraph);
        textRemaining = textRemaining.slice(maxCharactersPerParagraph);
    }

    const renderedParagraphs = paragraphs.map((paragraph, index) => (
        <p key={index} className=" text-center text-2 mr-2 ">
            {paragraph}
        </p>
    ));

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="max-w-screen-sm w-full bg-gray-300 p-4 rounded shadow-lg ">
                <div>
                    <h2 className="text-gray-800 text-3xl font-semibold text-center pb-2">
                        {title}
                    </h2>
                    {renderedParagraphs}
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
