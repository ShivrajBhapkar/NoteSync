import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios-config";
import UserPlaylistsCards from "./UserPlaylistsCards";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import TokenService from "../Services/token.service";
import "react-toastify/dist/ReactToastify.css";
import SkeletonLoader from "./SkeletonLoader";
import ActionModel from "./ActionModel";
const UserUnTrackPlayList = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = TokenService.getUser();
          const navigate = useNavigate(); 
    useEffect(() => {
        getVideos();
    }, []);
    const getVideos = async () => {
        try {
            const response = await axios.get(
                `/users/${user.userId}/untrackPlaylists`
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
    if (loading) {
        return <SkeletonLoader />;
    }
    return (
        <div className="flex  items-center h-screen">
            {playlists.length === 0 ? (
                <ActionModel
                    title="You don't have any untracked playlists."
                    subtitle="You should continue your learning by clicking below."
                    label="Continue"
                    action={() => {
                        navigate("/");
                    }}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen overflow-y-auto">
                    {playlists.map((playlist) => (
                        <Link key={playlist.playlistId}>
                            <UserPlaylistsCards playlistInfo={playlist} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserUnTrackPlayList;
