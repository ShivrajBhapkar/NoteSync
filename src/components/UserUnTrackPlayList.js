import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserPlaylistsCards from "./UserPlaylistsCards";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserUnTrackPlayList = () => {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);
    const userId = useSelector((store) => store.authentication.userId);
    const getVideos = async () => {
        try {
            const response = await axios.get(
                `/users/${userId}/untrackPlaylists`
            );

            if (response.status === 200) {
                const data = response.data;
                setPlaylists(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
                <Link key={playlist.playlistId}>
                    <UserPlaylistsCards playlistInfo={playlist} />
                </Link>
            ))}
        </div>
    );
};

export default UserUnTrackPlayList;
