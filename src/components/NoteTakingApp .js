import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios-config";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditNoteModal from "./EditNoteModal";
function formatTime(timeInSeconds) {
    if (timeInSeconds) {
        const timestampDate = new Date(timeInSeconds);
        const minutes = timestampDate.getUTCMinutes();
        const seconds = timestampDate.getUTCSeconds();
        return `${minutes}:${seconds}min`;
    } else {
        return "Invalid Time";
    }
}

const NoteTakingApp = () => {
    const [player, setPlayer] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState("");
    const [editedNoteText, setEditedNoteText] = useState("");
    const [editedNoteTimestamp, setEditedNoteTimestamp] = useState("");
    const userId = useSelector((store) => store.authentication.userId);
    const { playlistId } = useParams();
    const { videoId } = useParams();
    console.log(playlistId);
    console.log(videoId);
    const onReady = (event) => {
        setPlayer(event.target);
    };
    const handleEditNoteClick = (noteId, initialText, initialTimestamp) => {
        setSelectedNoteId(noteId);
        setEditedNoteText(initialText);
        setEditedNoteTimestamp(initialTimestamp); // Set initial timestamp
        setIsEditModalOpen(true);
    };
    const updateNoteTextAndTimestamp = (noteId, newText, newTimestamp) => {
        // Construct the PUT request URL
        const apiUrl = `/users/${userId}/notes/${noteId}`;
        const updatedNote = {
            timestamp: newTimestamp,
            text: newText,
        };
        // Use Axios to make the PUT request to update the note
        axios
            .put(apiUrl, updatedNote)
            .then((response) => {
                // Handle a successful response here
                console.log("Note updated successfully.");
                // Optionally, you can update the local state with the updated note.
                // Find the index of the note to update in the local state.
                const noteIndex = notes.findIndex(
                    (note) => note._id === noteId
                );
                if (noteIndex !== -1) {
                    // Create a copy of the notes array to avoid mutating state directly
                    const updatedNotes = [...notes];
                    // Replace the old note with the updated note
                    updatedNotes[noteIndex] = {
                        ...updatedNotes[noteIndex],
                        ...updatedNote,
                    };
                    setNotes(updatedNotes);
                }
            })
            .catch((error) => {
                // Handle errors here
                console.error("Failed to update note:", error);
            });
    };

    const fetchNotes = () => {
        // Construct the GET request URL
        const apiUrl = `/users/${userId}/playlist/${playlistId}/videos/${videoId}/notes`;

        // Use Axios to make the GET request to fetch notes
        axios
            .get(apiUrl)
            .then((response) => {
                // Handle the response data (notes) here
                const fetchedNotes = response.data; // Assuming the response contains an array of notes
                setNotes(fetchedNotes);
            })
            .catch((error) => {
                // Handle errors here
                console.error("Failed to fetch notes:", error);
            });
    };

    // Use useEffect to fetch notes when the component mounts or when the videoId changes
    useEffect(() => {
        fetchNotes();
    }, [videoId]);
    const addNote = () => {
        if (player) {
            const currentTime = player.getCurrentTime();
            const isoTimestamp = new Date(currentTime * 1000).toISOString();
            const newNote = { timestamp: isoTimestamp, text: noteText };

            // Replace with the actual user ID
            const apiUrl = `/users/${userId}/playlist/${playlistId}/videos/${videoId}/notes`;

            // Use Axios to make the POST request
            axios
                .post(apiUrl, newNote)
                .then((response) => {
                    // Handle a successful response here
                    setNotes([...notes, newNote]);
                    setNoteText("");
                    console.log("Note added successfully.");
                })
                .catch((error) => {
                    // Handle errors here
                    console.error("Failed to add note:", error);
                });
        }
    };

    return (
        <div className="w-full h-96 flex">
            <div className="flex-[60%]">
                <YouTube
                    videoId={videoId}
                    onReady={onReady}
                    opts={{
                        width: "100%",
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
            </div>
            <div className="flex-[40%]">
                <h2>Notes:</h2>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index}>
                            <strong>Time: {formatTime(note.timestamp)}</strong>
                            <p>{note.text}</p>
                            {/* <button
                                onClick={() =>
                                    handleEditNoteClick(
                                        note._id,
                                        note.text,
                                        note.timestamp
                                    )
                                }
                            >
                                Edit
                            </button> */}
                        </li>
                    ))}
                </ul>
            </div>
            {/* <EditNoteModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialText={editedNoteText}
                initialTimestamp={editedNoteTimestamp} // Pass the initial timestamp to the modal
                onSave={(newText, newTimestamp) => {
                    updateNoteTextAndTimestamp(
                        selectedNoteId,
                        newText,
                        newTimestamp
                    );
                }}
            /> */}
        </div>
    );
};

export default NoteTakingApp;
