import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../axios-config"; // Import your Axios instance
import { useNavigate, Navigate } from "react-router-dom"; // Import useNavigate for navigation

const UserPlaylistsCards = ({ playlistInfo }) => {
    const userId = useSelector((store) => store.authentication.userId);
    const navigate = useNavigate();
   
     const navigateToPlaylist = () => {
        navigate(`/playlist/${playlistInfo.playlistId}`);
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
                        onClick={navigateToPlaylist}
                        className="bg-blue-300 text-black font-bold rounded-md py-2 px-4 mt-2 relative z-10"
                    >
                        Continue Learning
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPlaylistsCards;
