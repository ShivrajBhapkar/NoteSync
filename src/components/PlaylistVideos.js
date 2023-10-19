import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const PlaylistVideos = () => {
    const [playlistData, setPlaylistData] = useState({});
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null); // New state for error handling
    const userId = useSelector((store) => store.authentication.userId);
    const { playlistId } = useParams();

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
            })
            .catch((videoError) => {
                console.error("Error fetching videos:", videoError);
                setError("Error fetching videos. Please try again later.");
            });
    }, [userId, playlistId]);

    // Check for errors and display an error message
    if (error) {
        return <div>{error}</div>;
    }
    console.log("videos", videos);

    // Once both API requests complete, or in the initial state, the UI will be rendered
    return (
        <div className="flex p-4 h-full">
            <div className="w-[35%] overflow-y-auto h-screen">
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

            <div className="w-2/3 p-4 overflow-y-auto h-screen space-y-2 ">
                <h2 className="text-2xl font-semibold">Videos</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-4">
                    {videos.map((video, index) => (
                        <div className="border-solid border-2 border-grey-200" key={video.videoId}>
                            <Link
                                to={`/watch/${playlistId}/${video.videoId}`}
                                key={video.videoId}
                            >
                                <div className="bg-white rounded-lg p-2 shadow-md">
                                    <img
                                        src={video.videoImageURL}
                                        alt={video.videoTitle}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <p className="text-sm font-semibold mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
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
