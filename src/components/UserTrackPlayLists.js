import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserLearningCards from "./UserLearningCards";
import tokenService from "../Services/token.service";
import SkeletonLoader from "./SkeletonLoader";
const UserUnTrackPlayList = () => {
    const [playlists, setPlaylists] = useState([]);
     const [loading, setLoading] = useState(true);
    useEffect(() => {
        getVideos();
    }, []);
  

    const getVideos = async () => {
        try {
            const {userId} = tokenService.getUser();
            const response = await axios.get(
                `/users/${userId}/trackPlaylists`
            );

            if (response.status === 200) {
                const data = response.data;
                setPlaylists(data);
                 setLoading(false);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className="w-full">
            {loading ? (
                <div className="w-full h-screen">
                    <SkeletonLoader />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen overflow-y-auto">
                        {playlists.map((playlist) => (
                            <Link
                                to={`/playlist/${playlist.playlistId}`}
                                key={playlist.playlistId}
                            >
                                <UserLearningCards playlistInfo={playlist} />
                            </Link>
                        ))
                        }
                </div>
            )}
        </div>
    );
};

export default UserUnTrackPlayList;
