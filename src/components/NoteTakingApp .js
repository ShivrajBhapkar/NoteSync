import React, { useState, useEffect} from "react";
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
import { BiEdit, BiTrash } from "react-icons/bi";
import {
    fetchVideoInfo,
} from "../Services/noteServices";
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState("");
    const [editedNoteText, setEditedNoteText] = useState("");
    const [editedNoteTimestamp, setEditedNoteTimestamp] = useState("");
    const { userId } = tokenService.getUser();
    const { playlistId } = useParams();
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.data);
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
     const updateNoteData = (noteId, newText, newTimestamp) => {
         const updatedNote = {
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
    
    const handleEditNoteClick = (noteId, initialText, initialTimestamp) => {
        setSelectedNoteId(noteId);
        setEditedNoteText(initialText);
        setEditedNoteTimestamp(initialTimestamp); // Set initial timestamp
        setIsEditModalOpen(true);
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
            const newNote = { timestamp: isoTimestamp, text: noteText };
            dispatch(createNoteUtil({ userId, playlistId, videoId, newNote })).then(() => {
                 setNoteText(""); 
            })
            
        }
    };
    const compareNotesByTimestamp = (noteA, noteB) => {
        const timestampA = new Date(noteA.timestamp);
        const timestampB = new Date(noteB.timestamp);
        return timestampA - timestampB;
    };
    console.log("VideoTitle", videoInfo.videoTitle);
    const sortedNotes = [...notes].sort(compareNotesByTimestamp);
    return dataIsReady ? (
        <div className=" flex max-h-screen overflow-y-hidden">
            <div className="flex-[60%] overflow-y-hidden">
                <YouTube
                    videoId={videoId}
                    onReady={onReady}
                    opts={{
                        width: "100%",
                        height: "400px",
                    }}
                />
                <div className=" w-full p-2 shadow-xl bg-gray-300">
                    <form onSubmit={addNoteData}>
                        <div className="mb-2">
                            <label
                                htmlFor="postContent"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Note Content:
                            </label>
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
            <div className="flex-[40%] bg-gray-200 overflow-y-auto max-h-screen h-screen  p-2">
                <div className=" p-2 rounded-lg shadow-sm border-2 border-solid border-gray-300">
                    <h3 className="text-lg font-semibold">
                        {videoInfo.videoTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {videoInfo.videoDescription}
                    </p>
                    <p className="text-sm text-gray-600">{`Channel: ${videoInfo.channelTitle}`}</p>
                </div>
                <div className="h-screen">
                    <h2 className="text-xl font-300 font-bold">Notes:</h2>
                    <ul className="flex flex-col pl-2 max-h-screen">
                        {sortedNotes.map((note, index) => (
                            <li
                                key={note._id}
                                className="border rounded-lg p-4 mb-2 shadow-md border-gray-300"
                            >
                                <div className="flex items-center justify-between">
                                    <strong>
                                        Time: {formatTime(note.timestamp)}
                                    </strong>
                                    <p>{note.text}</p>
                                    <div>
                                        <button>
                                            <BsCardText />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleEditNoteClick(
                                                    note._id,
                                                    note.text,
                                                    note.timestamp
                                                )
                                            }
                                            className=" text-blue-500 px-2 py-1 rounded-lg ml-2"
                                        >
                                            <BiEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openDeleteConfirmationModal(
                                                    note._id
                                                )
                                            }
                                            className=" text-red-500 px-2 py-1 rounded-lg ml-2"
                                        >
                                            <BiTrash />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <EditNoteModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialText={editedNoteText}
                initialTimestamp={editedNoteTimestamp}
                onSave={(newText, newTimestamp) => {
                    updateNoteData(selectedNoteId, newText, newTimestamp);
                }}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteConfirmationOpen}
                onClose={closeDeleteConfirmationModal}
                onConfirm={deleteNoteData}
            />
        </div>
    ) : (
        <div>Loading data...</div>
    );
};

export default NoteTakingApp;
