import React from "react";
import { useSelector } from "react-redux";
import axios from "../axios-config"; // Import your Axios instance
import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate for navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserPlaylistsCards = ({ playlistInfo }) => {
    const userId = useSelector((store) => store.authentication.userId);
    const navigate = useNavigate();
     function notifyme(msg) {
         const notify = () =>
             toast.info(msg, {
                 position: "top-center",
                 autoClose: 9000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
             });
         notify();
     }
      const addToLearning = async () => {
          try {
              const payload = {
                  playlistId: playlistInfo.playlistId, // Replace with the actual playlistId
              };

              // Make the POST request
              await axios.post(`/users/${userId}/trackPlaylists`, payload).then(() => {
                    notifyme("Playlist added to learning successfully");
              })
            
              // Navigate to the "/" page after successfully adding the playlist
              navigate("/");
          } catch (error) {
              // Handle errors (e.g., display an error message)
              console.error("Error adding playlist to learning:", error);
          }
      };


    return (
        <div className="relative p-2 m-2 w-72 h-72 shadow-lg overflow-hidden">
            <img
                className="rounded-lg"
                alt="thumbnail"
                src={playlistInfo.playlistImageURL}
            />
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <ul>
                        <li className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {playlistInfo.playlistTitle}
                        </li>
                    </ul>
                    <button
                        onClick={addToLearning} // Call the addToLearning function on button click
                        className="bg-blue-300 text-black font-bold rounded-md py-2 px-4 mt-2 relative z-10"
                    >
                        Add To Learning
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default UserPlaylistsCards;
