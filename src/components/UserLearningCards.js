import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../axios-config"; // Import your Axios instance
import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate for navigation
import Button from "./ui/Button";
const UserPlaylistsCards = ({ playlistInfo }) => {
    const userId = useSelector((store) => store.authentication.userId);
    const navigate = useNavigate();
   
     const navigateToPlaylist = () => {
        navigate(`/playlist/${playlistInfo.playlistId}`);
    };
     const untrackPlaylist = () => {
         // Define the URL for the DELETE request
         const deleteUrl = `/users/${userId}/trackPlaylists`;

         // Define the request body with the playlistId
         const requestBody = { playlistId: playlistInfo.playlistId };

         // Make a DELETE request to untrack the playlist
         axios
             .delete(deleteUrl, { data: requestBody })
             .then((response) => {
                 // Handle the success response (e.g., update UI or state)
                 // You might want to update the list of tracked playlists in your Redux state.
                 // dispatch({ type: "UNTRACK_PLAYLIST", playlistId: playlistInfo.playlistId });
                  navigate("/");
             })
             .catch((error) => {
                 // Handle any errors, such as displaying an error message to the user.
                 console.error("Error untracking playlist: ", error);
             });
     };
 
  
    return (
        <div className="relative p-2 m-2 w-72  shadow-lg overflow-hidden">
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
                    <div className="mt-4 space-x-2">
                        <button
                            onClick={navigateToPlaylist}
                            className="bg-blue-500 text-white font-bold rounded-md py-2 px-4"
                        >
                            Continue
                        </button>
                        <Button
                            onClick={untrackPlaylist}
                            label="Untrack"
                            action="secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPlaylistsCards;
