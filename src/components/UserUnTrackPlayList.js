import React from "react";
import { Link } from "react-router-dom";
import { BASE } from "../utils/constants";
import { useState, useEffect } from "react";
import UserVideoCards from "./UserVideoCards";
const UserUnTrackPlayList = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);
    const getVideos = async () => {
        try {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTE4MjBkYTg1Zjg3Zjc2ZDQ2N2E2ZjQiLCJpYXQiOjE2OTY1Mjc5NTYsImV4cCI6MTY5NjcwMDc1NiwidHlwZSI6ImFjY2VzcyJ9.jJGxCrpf3RI1nfyaZ7g1tU3Uyj3YFnPwIqZurjrThXk";
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await fetch(
                `${BASE}/users/651820da85f87f76d467a6f4/untrackPlaylists`,
                {
                    headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log(videos);
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
