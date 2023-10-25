import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotesUtil,
    createNoteUtil,
    updateNoteUtil,
    deleteNoteUtil,
} from "../utils/noteSlice";
import { useParams } from "react-router-dom";
import EditNoteModal from "./EditNoteModal";
import { BiSolidSend } from "react-icons/bi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import tokenService from "../Services/token.service";
import { BsCardText } from "react-icons/bs";
import { BiEdit, BiTrash, BiSearch } from "react-icons/bi";
import { fetchVideoInfo } from "../Services/noteServices";
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
    const [noteTitle, setNoteTitle] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState("");
    const [editedNoteText, setEditedNoteText] = useState("");
    const [editedNoteTitle, setEditedNoteTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [editedNoteTimestamp, setEditedNoteTimestamp] = useState("");
    const { userId } = tokenService.getUser();
    const { playlistId } = useParams();
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const notes = useSelector((state) => state.notes.data);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [noteToDeleteId, setNoteToDeleteId] = useState("");
  const [selectedNoteToDelete, setSelectedNoteToDelete] = useState(null);

  const openDeleteConfirmationModalForNote = (noteId) => {
      setSelectedNoteToDelete(noteId);
      setIsDeleteConfirmationOpen(true);
  };
    // const openDeleteConfirmationModal = (noteId) => {
    //     setNoteToDeleteId(noteId);
    //     setIsDeleteConfirmationOpen(true);
    // };

    const closeDeleteConfirmationModal = () => {
        setIsDeleteConfirmationOpen(false);
    };
    const fetchVideoInfoData = () => {
        fetchVideoInfo(playlistId, videoId)
            .then((videoInfo) => {
                setVideoInfo(videoInfo);
            })
            .catch((error) => {
                console.error("Failed to fetch video information:", error);
            });
    };
    const fetchNotesData = () => {
        dispatch(fetchNotesUtil({ userId, playlistId, videoId }));
    };
    const updateNoteData = (noteId, newTitle, newText, newTimestamp) => {
        const updatedNote = {
            title: newTitle,
            timestamp: newTimestamp,
            text: newText,
        };
        dispatch(updateNoteUtil({ noteId, userId, updatedNote }));
    };
    const deleteNoteData = () => {
        dispatch(deleteNoteUtil({ userId, noteToDeleteId })).then(() => {
            closeDeleteConfirmationModal();
        });
    };

    const handleEditNoteClick = (
        noteId,
        initialTitle,
        initialText,
        initialTimestamp
    ) => {
        setEditingNote({
            noteId,
            initialTitle,
            initialText,
            initialTimestamp,
        });
        setIsEditing(true);
    };
    const onReady = (event) => {
        setPlayer(event.target);
        setIsPlayerReady(true);
    };
    useEffect(() => {
        // Create two promises for the API calls
        const fetchNotesPromise = fetchNotesData();
        const fetchVideoInfoPromise = fetchVideoInfoData();

        // Use Promise.all to wait for both promises to resolve
        Promise.all([fetchNotesPromise, fetchVideoInfoPromise])
            .then(() => {
                // Both API calls were successful
                // Set the data readiness flag to true
                setDataIsReady(true);
            })
            .catch((error) => {
                console.error("API calls failed:", error);
            });
    }, [videoId]);

    const addNoteData = async (e) => {
        e.preventDefault();
        if (player) {
            const currentTime = player.getCurrentTime();
            const isoTimestamp = new Date(currentTime * 1000).toISOString();
            const newNote = {
                title: noteTitle,
                timestamp: isoTimestamp,
                text: noteText,
            };
            dispatch(
                createNoteUtil({ userId, playlistId, videoId, newNote })
            ).then(() => {
                setNoteText("");
                setNoteTitle("");
            });
        }
    };
    const compareNotesByTimestamp = (noteA, noteB) => {
        const timestampA = new Date(noteA.timestamp);
        const timestampB = new Date(noteB.timestamp);
        return timestampA - timestampB;
    };
    console.log("VideoTitle", videoInfo.videoTitle);
    const sortedNotes = [...notes].sort(compareNotesByTimestamp);
    const filteredNotes = sortedNotes.filter((note) => {
        if (note && note.title && note.text) {
            return (
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return false; // Exclude notes with missing or empty title/text properties.
    });
    return dataIsReady ? (
        <div className="flex max-h-screen flex-col  lg:flex-row xl:flex-row ">
            <div className="flex-[60%]">
                <YouTube
                    videoId={videoId}
                    onReady={onReady}
                    opts={{
                        width: "100%",
                        height: "450px",
                    }}
                />
                <div className="w-full p-2 shadow-lg">
                    <form onSubmit={addNoteData}>
                        <div className="mb-2">
                            <label
                                htmlFor="postContent"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Note Content:
                            </label>
                            <input
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                className=" max-w-md w-full border-grey shadow-md border-solid solid border-2 rounded-md px-4 py-2 leading-5  sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200 mb-2"
                                placeholder="Add your title here ..."
                            ></input>
                            <textarea
                                rows="4"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className=" max-w-md w-full border-grey shadow-md border-solid solid border-2 rounded-md px-4 py-2 leading-5  sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200"
                                placeholder="Add your note here ..."
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                            >
                                Add
                                <BiSolidSend />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-[40%] max-h-screen h-screen overflow-y-auto pl-4 ">
                <div className=" p-2 rounded-lg shadow-sm border-2 border-solid border-gray-300">
                    <h3 className="text-lg font-semibold">
                        {videoInfo.videoTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {videoInfo.videoDescription}
                    </p>
                    <p className="text-sm text-gray-600">{`Channel: ${videoInfo.channelTitle}`}</p>
                </div>
                <div>
                    <h2 className="text-xl font-300 font-bold">Notes:</h2>
                    {notes.length > 0 && (
                        <div className="relative text-gray-600 mb-4">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                className="border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-500 w-full"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="absolute right-3 top-2 text-gray-400">
                                <BiSearch size={20} />
                            </button>
                        </div>
                    )}
                    {selectedNoteToDelete ? (
                        // Render the delete confirmation modal when a note is selected for deletion
                        <DeleteConfirmationModal
                            isOpen={isDeleteConfirmationOpen}
                            onClose={() => {
                                setSelectedNoteToDelete(null);
                                setIsDeleteConfirmationOpen(false);
                            }}
                            onConfirm={deleteNoteData}
                        />
                    ) : isEditing ? (
                        <EditNoteModal
                            isOpen={isEditing}
                            onClose={() => {
                                setEditingNote(null);
                                setIsEditing(false);
                            }}
                            initialText={editingNote.initialText}
                            initialTitle={editingNote.initialTitle}
                            initialTimestamp={editingNote.initialTimestamp}
                            onSave={(newText, newTimestamp, newTitle) => {
                                updateNoteData(
                                    editingNote.noteId,
                                    newTitle,
                                    newText,
                                    newTimestamp
                                );
                                setEditingNote(null);
                                setIsEditing(false);
                            }}
                        />
                    ) : (
                        <ul className="flex flex-col pl-2 h-[100%] overflow-y-scroll">
                            {filteredNotes.map((note) => (
                                <li
                                    key={note._id}
                                    className="border rounded-lg p-4 mb-2 shadow-md border-gray-300"
                                >
                                    <div className="flex flex-col justify-between gap-y-2">
                                        <div className="text-center">
                                            <p>{note.title}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <strong>
                                                Time:{" "}
                                                {formatTime(note.timestamp)}
                                            </strong>
                                            <p>{note?.text}</p>
                                            <div>
                                                <button>
                                                    <BsCardText />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleEditNoteClick(
                                                            note._id,
                                                            note.title,
                                                            note.text,
                                                            note.timestamp
                                                        )
                                                    }
                                                    className="text-blue-500 px-2 py-1 rounded-lg ml-2"
                                                >
                                                    <BiEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openDeleteConfirmationModalForNote(
                                                            note._id
                                                        )
                                                    }
                                                    className="text-red-500 px-2 py-1 rounded-lg ml-2"
                                                >
                                                    <BiTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div>Loading data...</div>
    );
};

export default NoteTakingApp;
