import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserVideoCards from "./UserVideoCards";
const UserUnTrackPlayList = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const response = await axios.get(
                "/users/651820da85f87f76d467a6f4/untrackPlaylists"
            );

            if (response.status === 200) {
                const data = response.data;
                setVideos(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className="flex flex-wrap">
            {videos.map((video) => (
                <Link key={video.id}>
                    <UserVideoCards playlistInfo={video} />
                </Link>
            ))}
        </div>
    );
};

export default UserUnTrackPlayList;
