import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import axios from "../axios-config";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditNoteModal from "./EditNoteModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
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
    const [dataIsReady, setDataIsReady] = useState(false);
    const [videoInfo, setVideoInfo] = useState([]);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState("");
    const [editedNoteText, setEditedNoteText] = useState("");
    const [editedNoteTimestamp, setEditedNoteTimestamp] = useState("");
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const userId = useSelector((store) => store.authentication.userId);
    const { playlistId } = useParams();
    const { videoId } = useParams();
     const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
         useState(false);
     const [noteToDeleteId, setNoteToDeleteId] = useState("");

     const openDeleteConfirmationModal = (noteId) => {
         setNoteToDeleteId(noteId);
         setIsDeleteConfirmationOpen(true);
     };

     const closeDeleteConfirmationModal = () => {
         setIsDeleteConfirmationOpen(false);
     };
const fetchVideoInfo = () => {
    const apiUrl = `/users/playlist/${playlistId}/video/${videoId}`;

    axios
        .get(apiUrl)
        .then((response) => {
            // Handle the response data (video information) here
            const videoInfo = response.data; // Assuming the response contains the video details
            setVideoInfo(videoInfo);
            console.log("Video information fetched:", videoInfo);
            // You can update the component's state with the video information if needed.
        })
        .catch((error) => {
            // Handle errors here
            console.error("Failed to fetch video information:", error);
        });
};
     const deleteNote = () => {
         // Construct the DELETE request URL
         const apiUrl = `/users/${userId}/notes/${noteToDeleteId}`;

         // Use Axios to make the DELETE request to delete the note
         axios
             .delete(apiUrl)
             .then((response) => {
                 // Handle a successful response here
                 console.log("Note deleted successfully.");
                 // Optionally, you can update the local state to remove the deleted note.
                 setNotes(notes.filter((note) => note._id !== noteToDeleteId));
                 closeDeleteConfirmationModal(); // Close the delete confirmation modal
             })
             .catch((error) => {
                 // Handle errors here
                 console.error("Failed to delete note:", error);
             });
     };
  const onReady = (event) => {
      setPlayer(event.target);
      setIsPlayerReady(true);
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
      // Create two promises for the API calls
      const fetchNotesPromise = fetchNotes();
      const fetchVideoInfoPromise = fetchVideoInfo();

      // Use Promise.all to wait for both promises to resolve
      Promise.all([fetchNotesPromise, fetchVideoInfoPromise])
          .then(() => {
              // Both API calls were successful
              // Set the data readiness flag to true
              setDataIsReady(true);
          })
          .catch((error) => {
              // Handle errors here if needed
              console.error("API calls failed:", error);
          });
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
    

    
 const compareNotesByTimestamp = (noteA, noteB) => {
     const timestampA = new Date(noteA.timestamp);
     const timestampB = new Date(noteB.timestamp);
     return timestampA - timestampB;
    };
    console.log("VideoTitle" , videoInfo.videoTitle)
const sortedNotes = [...notes].sort(compareNotesByTimestamp);
    return dataIsReady ? (
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
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">
                        {videoInfo.videoTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {videoInfo.videoDescription}
                    </p>
                    <p className="text-sm text-gray-600">{`Channel: ${videoInfo.channelTitle}`}</p>
                </div>
                <h2>Notes:</h2>
                <ul>
                    {sortedNotes.map((note, index) => (
                        <li>
                            <strong>Time: {formatTime(note.timestamp)}</strong>
                            <p>{note.text}</p>
                            <button
                                onClick={() =>
                                    handleEditNoteClick(
                                        note._id,
                                        note.text,
                                        note.timestamp
                                    )
                                }
                                className="bg-blue-500 text-white px-2 py-1 rounded-lg m-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() =>
                                    openDeleteConfirmationModal(note._id)
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded-lg m-1"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <EditNoteModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialText={editedNoteText}
                initialTimestamp={editedNoteTimestamp}
                onSave={(newText, newTimestamp) => {
                    updateNoteTextAndTimestamp(
                        selectedNoteId,
                        newText,
                        newTimestamp
                    );
                }}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={closeDeleteConfirmationModal}
                onConfirm={deleteNote}
            />
        </div>
    ) : (
        <div>Loading data...</div>
    );

  
};

export default NoteTakingApp;
