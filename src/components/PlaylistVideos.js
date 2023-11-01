import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import tokenService from "../Services/token.service";
import PlaylistVideosSkeleton from "./PlaylistVideosSkeleton";
const PlaylistVideos = () => {
    const [playlistData, setPlaylistData] = useState({});
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null); // New state for error handling
    const { playlistId } = useParams();
    const { userId } = tokenService.getUser();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // First API call to fetch playlist info
        axios
            .get(`/users/playlists/${playlistId}`)
            .then((response) => {
                setPlaylistData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching playlist info:", error);
                setError(
                    "Error fetching playlist info. Please try again later."
                );
            });

        // Second API call to fetch playlist videos
        axios
            .get(`/users/${userId}/playlist/${playlistId}/videos`)
            .then((videoResponse) => {
                setVideos(videoResponse.data);
                setLoading(false);
            })
            .catch((videoError) => {
                console.error("Error fetching videos:", videoError);
                setError("Error fetching videos. Please try again later.");
            });
    }, [userId, playlistId]);

    // Check for errors and display an error message
    if (loading) {
        return <PlaylistVideosSkeleton />;
    }
    if (error) {
        return <div>{error}</div>;
    }

    // Once both API requests complete, or in the initial state, the UI will be rendered
    return (
        <div className="flex p-4 h-full lg:flex-row xl:flex-row flex-col overflow-y-auto">
            <div className="lg:w-[35%] xl:w-[35%]">
                <div className="w-full p-4 shadow-lg bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg overflow-x-auto h-[100%]">
                    <img
                        src={playlistData.playlistImageURL}
                        alt={playlistData.playlistTitle}
                        className="w-full rounded-lg"
                    />
                    <h1 className="text-2xl font-semibold mt-4">
                        {playlistData.playlistTitle}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {playlistData.playlistDesc}
                    </p>
                </div>
            </div>

            <div className="lg:w-2/3 xl:w-2/3 p-4 lg:overflow-y-auto xl:overflow-y-auto space-y-2 ">
                <h2 className="text-2xl font-semibold">Videos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-4 lg:w-full xl:w-full md:w-full">
                    {videos.map((video) => (
                        <div
                            className="border-solid border-2 border-grey-200"
                            key={video.videoId}
                        >
                            <Link
                                to={`/dashboard/watch/${playlistId}/${video.videoId}`}
                                key={video.videoId}
                            >
                                <div className="bg-white rounded-lg p-2 shadow-md">
                                    <img
                                        src={video.videoImageURL}
                                        alt={video.videoTitle}
                                        className="lg:w-full xl:w-full md:w-full w-[60%] mx-auto h-44 object-cover rounded-lg"
                                    />
                                    <p className="text-sm  text-center  font-semibold mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {video.videoTitle}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistVideos;
