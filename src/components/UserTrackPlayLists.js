import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserLearningCards from "./UserLearningCards"
import { useSelector } from "react-redux";
const UserUnTrackPlayList = () => {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);
    const userId = useSelector((store) => store.authentication.userId);
    const getVideos = async () => {
        try {
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
        <div className="flex flex-wrap">
            {playlists.map((playlist) => (
                <Link key={playlist.playlistId}>
                    <UserLearningCards playlistInfo={playlist} />
                </Link>
            ))}
        </div>
    );
};

export default UserUnTrackPlayList;
