import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import { useParams, useSearchParams } from "react-router-dom";
function formatTime(timeInSeconds) {
  if (timeInSeconds < 60) {
    return timeInSeconds.toFixed(0) + 's'; // Display seconds without decimal places
  } else {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds}min`;
  }
}
const customYouTubeClass = "w-full h-96"; 

const NoteTakingApp = () => {
    // const [videoId, setVideoId] = useState("YOUR_YOUTUBE_VIDEO_ID"); // Replace with your YouTube video ID
    const [searchParams] = useSearchParams();
    const [player, setPlayer] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState([]);
    const { playlistId } = useParams();
     const { videoId } = useParams();
    console.log(playlistId);
    console.log(videoId);
    const onReady = (event) => {
        setPlayer(event.target);
    };

    const addNote = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            const newNote = { time: currentTime, text: noteText };
            setNotes([...notes, newNote]);
            setNoteText("");
        }
    };

    return (
        <div className="w-full h-96">
            <YouTube
                videoId={videoId}
                onReady={onReady}
                opts={{
                    width: "60%",
                    height: "500 px",
                }}
            />
            <div>
                <input
                    type="text"
                    placeholder="Add a note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <div>
                <h2>Notes:</h2>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index}>
                            <strong>Time: {formatTime(note.time)}</strong>
                            <p>{note.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NoteTakingApp;
