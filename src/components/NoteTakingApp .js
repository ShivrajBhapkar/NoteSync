import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotesUtil,
    createNoteUtil,
    updateNoteUtil,
    deleteNoteUtil,
} from "../utils/noteSlice";
import NoteForm from "./NoteForm";
import { useParams } from "react-router-dom";
import EditNoteModal from "./EditNoteModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import tokenService from "../Services/token.service";
import { BsCardText } from "react-icons/bs";
import { BiEdit, BiTrash, BiSearch } from "react-icons/bi";
import { fetchVideoInfo } from "../Services/noteServices";
import NoteTakingAppSkeleton from "./NoteTakingAppSkeleton";
import VideoInfo from "./VideoInfo";
import NoteCard from "./NoteCard";
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
    const [searchQuery, setSearchQuery] = useState("");
    const { userId } = tokenService.getUser();
    const { playlistId } = useParams();
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const notes = useSelector((state) => state.notes.data);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [selectedNoteToDelete, setSelectedNoteToDelete] = useState(null);
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [playerDimensions, setPlayerDimensions] = useState({
        width: "100%",
        height: "400px",
    });
    const openNoteCard = (note) => {
        setSelectedNote(note);
        setIsCardOpen(true);
    };
    //  Handling youtube compoent reposiness
    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;

            // Adjust dimensions based on screen size
            if (viewportWidth >= 768 && viewportWidth <= 1280) {
                setPlayerDimensions({
                    width: "100%",
                    height: "420px",
                });
            } else if (viewportWidth > 1280 && viewportWidth <= 1536) {
                setPlayerDimensions({
                    width: "100%",
                    height: "480px", // Adjust the height for smaller screens
                });
            }
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);

        // Initial setup
        handleResize();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Fetch Video Info
    const fetchVideoInfoData = () => {
        fetchVideoInfo(playlistId, videoId)
            .then((videoInfo) => {
                setVideoInfo(videoInfo);
            })
            .catch((error) => {
                console.error("Failed to fetch video information:", error);
            });
    };

    // Fetch Notes list
    const fetchNotesData = () => {
        dispatch(fetchNotesUtil({ userId, playlistId, videoId }));
    };

    // Update Notes
    const updateNoteData = (noteId, newTitle, newText, newTimestamp) => {
        const updatedNote = {
            title: newTitle,
            timestamp: newTimestamp,
            text: newText,
        };
        dispatch(updateNoteUtil({ noteId, userId, updatedNote }));
    };

    // Delete Note
    const deleteNoteData = (selectedNoteToDelete) => {
        dispatch(deleteNoteUtil({ userId, selectedNoteToDelete })).then(() => {
            closeDeleteConfirmationModal();
        });
    };

    // Create Note Handle
    const handleNoteFormSubmit = (values) => {
        if (player) {
            const currentTime = player.getCurrentTime();
            const isoTimestamp = new Date(currentTime * 1000).toISOString();
            const newNote = {
                title: values.noteTitle,
                timestamp: isoTimestamp,
                text: values.noteText,
            };
            dispatch(createNoteUtil({ userId, playlistId, videoId, newNote }));
        }
    };
    // Update Note Handle
    const handleEditNoteClick = (note) => {
        setSelectedNote(note);
        setIsEditing(true);
    };

    // Delete Note Model Handel
    const openDeleteConfirmationModalForNote = (noteId) => {
        setSelectedNoteToDelete(noteId);
        setIsDeleteConfirmationOpen(true);
    };

    const closeDeleteConfirmationModal = () => {
        setIsDeleteConfirmationOpen(false);
    };

    // On Player Ready

    const onReady = (event) => {
        setPlayer(event.target);
        setIsPlayerReady(true);
    };

    // Seek video at specific time
    const handleTimestampClick = (timestamp) => {
        // Convert the timestamp (in the format 'minutes:seconds') to seconds
        const [minutes, seconds] = timestamp.split(":");
        const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

        // Use the seekTo method to move the video to the desired timestamp
        player.seekTo(totalSeconds);
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

    const compareNotesByTimestamp = (noteA, noteB) => {
        const timestampA = new Date(noteA.timestamp);
        const timestampB = new Date(noteB.timestamp);
        return timestampA - timestampB;
    };
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
        <div className="flex lg:h-full md:h-full xl:h-full max-h-fit flex-col lg:flex-row xl:flex-row sm:overflow-y-auto lg:overflow-y-hidden xl:overflow-y-hidden overflow-y-auto">
            <div className="flex-[60%] ">
                <YouTube
                    videoId={videoId}
                    onReady={onReady}
                    opts={playerDimensions}
                />
                <div className="w-full shadow-lg">
                    <NoteForm onSubmit={handleNoteFormSubmit} />
                </div>
            </div>
            <div className="flex-[40%] p-4 h-screen md::overflow-y-auto lg:overflow-y-auto xl:overflow-y-auto">
                <VideoInfo videoInfo={videoInfo} />
                <div>
                    {sortedNotes.length > 0 && (
                        <h2 className="text-xl font-300 font-bold">Notes:</h2>
                    )}
                    {sortedNotes.length > 0 ? (
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
                    ) : (
                        // Render a message when there are no notes
                        <p className="text-gray-600 font-bold text-xl text-center my-4">
                            You haven't added any notes yet. Start by adding
                            your first note!
                        </p>
                    )}
                    {selectedNoteToDelete ? (
                        <DeleteConfirmationModal
                            isOpen={isDeleteConfirmationOpen}
                            onClose={() => {
                                setSelectedNoteToDelete(null);
                                setIsDeleteConfirmationOpen(false);
                            }}
                            selectedNoteToDelete={selectedNoteToDelete}
                            onSave={(selectedNoteToDelete) => {
                                deleteNoteData(selectedNoteToDelete);
                            }}
                        />
                    ) : isEditing ? (
                        <EditNoteModal
                            isOpen={isEditing}
                            onClose={() => {
                                setEditingNote(null);
                                setIsEditing(false);
                            }}
                            note={selectedNote}
                            onNoteUpdate={(
                                noteId,
                                newTitle,
                                newText,
                                newTimestamp
                            ) => {
                                updateNoteData(
                                    noteId,
                                    newTitle,
                                    newText,
                                    newTimestamp
                                );
                                setEditingNote(null);
                                setIsEditing(false);
                            }}
                        />
                    ) : isCardOpen ? (
                        <NoteCard
                            title={selectedNote.title}
                            text={selectedNote.text}
                            onClose={() => setIsCardOpen(false)}
                        />
                    ) : (
                        <ul className="flex flex-col pl-2 h-[100%] max-h-max overflow-y-auto">
                            {filteredNotes.map((note) => (
                                <li
                                    key={note._id}
                                    className="border rounded-lg p-4 mb-2 shadow-md border-gray-300"
                                >
                                    <div className="flex flex-col justify-between gap-y-2">
                                        <div className="text-center">
                                            <p
                                                onClick={() =>
                                                    handleTimestampClick(
                                                        formatTime(
                                                            note.timestamp
                                                        )
                                                    )
                                                }
                                                className="text-xl font-bold"
                                            >
                                                {note.title}
                                                <div className="border-b border-gray-300 w-[80%] mx-auto my-2"></div>
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <strong
                                                onClick={() =>
                                                    handleTimestampClick(
                                                        formatTime(
                                                            note.timestamp
                                                        )
                                                    )
                                                }
                                            >
                                                Time :
                                                <span className="cursor-pointer pl-2 text-blue-500">
                                                    {formatTime(note.timestamp)}
                                                </span>
                                            </strong>
                                            <div>
                                                {note?.text.length > 10 ? (
                                                    <div>
                                                        {note?.text.substring(
                                                            0,
                                                            10
                                                        )}
                                                        {note?.text.length > 10
                                                            ? "..."
                                                            : ""}
                                                    </div>
                                                ) : (
                                                    <div>{note?.text}</div>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        openNoteCard(note)
                                                    }
                                                >
                                                    <BsCardText />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleEditNoteClick(
                                                            note
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
        <NoteTakingAppSkeleton />
    );
};

export default NoteTakingApp;
