import React, { useState } from "react";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TokenService from "../Services/token.service";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "./LoadingButton";
const UserPlaylistsCards = ({ playlistInfo }) => {
    const user = TokenService.getUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [setAnimation] = useState(false);
    function notifyme(msg) {
        const notify = () =>
            toast.info(msg, {
                position: "top-center",
                autoClose: 9000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        notify();
    }
    async function addToLearning() {
        if (loading) return; // Prevent multiple clicks while loading

        try {
            setLoading(true); // Start loading state
            setAnimation(true); // Start animation

            const payload = {
                playlistId: playlistInfo.playlistId,
            };

            await axios.post(`/users/${user.userId}/trackPlaylists`, payload);

            // On success, display the success message and navigate
            notifyme("Playlist added to learning successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error adding playlist to learning:", error);
        } finally {
            setLoading(false); // Reset loading state
            setAnimation(false); // Stop animation
        }
    }
    return (
        <div className="relative p-2 m-2 w-[90%] h-74 shadow-lg overflow-x-hidden">
            <img
                className="rounded-lg"
                alt="thumbnail"
                src={playlistInfo.playlistImageURL}
            />
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <ul>
                        <li className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {playlistInfo.playlistTitle}
                        </li>
                    </ul>
                    <LoadingButton
                        loading={loading}
                        text="Add To Learning"
                        Action={addToLearning}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserPlaylistsCards;
