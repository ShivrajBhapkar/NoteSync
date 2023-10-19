import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserLearningCards from "./UserLearningCards";
import tokenService from "../Services/token.service";
const UserUnTrackPlayList = () => {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);
  

    const getVideos = async () => {
        try {
            const {userId
        } = tokenService.getUser();
            const response = await axios.get(
                `/users/${userId}/trackPlaylists`
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
                <Link
                    to={`/playlist/${playlist.playlistId}`}
                    key={playlist.playlistId}
                >
                    <UserLearningCards playlistInfo={playlist} />
                </Link>
            ))}
        </div>
    );
};

export default UserUnTrackPlayList;
