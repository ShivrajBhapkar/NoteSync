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
    console.log("videos" , videos)

    // Once both API requests complete, or in the initial state, the UI will be rendered
    return (
        <div className="flex p-4">
            <div className="w-1/3 p-4">
                <img
                    src={playlistData.playlistImageURL}
                    alt={playlistData.playlistTitle}
                    className="w-full rounded-lg"
                />
                <h1 className="text-xl font-semibold mt-4">
                    {playlistData.playlistTitle}
                </h1>
                <p className="text-gray-600">{playlistData.playlistDesc}</p>
            </div>

            <div className="w-2/3 p-4">
                <h2 className="text-2xl font-semibold">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {videos.map((video, index) => (
                        <Link key={video.id} to={"/watch?v=" + video.videoId}>
                            <div
                                className="bg-white rounded-lg p-2"
                                key={video.videoId}
                            >
                                <img
                                    src={video.videoImageURL}
                                    alt={video.videoTitle}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <p className="text-md font-medium mt-2">
                                    {video.videoTitle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistVideos;
