import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentContainer from "./CommentContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(0);
    const [newNote, setNewNote] = useState("");
    const [annotations, setAnnotations] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);

 


    const addNoteWithTimestamp = (e) => {
        e.preventDefault();
        if (newNote.trim() !== "") {
            setAnnotations([
                ...annotations,
                { timestamp: currentTime, note: newNote },
            ]);
            setNewNote("");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 flex">
                <div>
                    <iframe
                        // id="player"
                        width="900"
                        height="500"
                        src={
                            "https://www.youtube.com/embed/" +
                            searchParams.get("v")
                        }
                        title="YouTube video player"
                        // frameBorder="0"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* <div className="w-full">
                    <LiveChat />
                </div> */}
            </div>
            <CommentContainer />
            <div>
                <p>Current Video Time: {currentTime.toFixed(2)}</p>
                <form onSubmit={addNoteWithTimestamp}>
                    <input
                        type="text"
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button type="submit">Add Note</button>
                </form>
                <div>
                    <h2>Video Annotations:</h2>
                    <ul>
                        {annotations.map((annotation, index) => (
                            <li key={index}>
                                <strong>
                                    {annotation.timestamp.toFixed(2)}:
                                </strong>{" "}
                                {annotation.note}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
