import React from "react";
import { useSelector } from "react-redux";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

const UserPlaylistsCards = ({ playlistInfo }) => {
    const userId = useSelector((store) => store.authentication.userId);
    const navigate = useNavigate();

    const navigateToPlaylist = () => {
        navigate(`/playlist/${playlistInfo.playlistId}`);
    };

    const untrackPlaylist = () => {
        const deleteUrl = `/users/${userId}/trackPlaylists`;
        const requestBody = { playlistId: playlistInfo.playlistId };

        axios
            .delete(deleteUrl, { data: requestBody })
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error untracking playlist: ", error);
            });
    };

    return (
        <div className="p-2 m-2">
            <div className="relative w-full aspect-w-2 aspect-h-3 shadow-lg overflow-hidden">
                <img
                    className="object-cover rounded-lg"
                    alt="thumbnail"
                    src={playlistInfo.playlistImageURL}
                />
            </div>
            <div className="mt-4">
                <ul>
                    <li className="font-bold truncate text-center">
                        {playlistInfo.playlistTitle}
                    </li>
                </ul>
                <div className="mt-2  flex sm:flex-row md:flex-row lg:flex-row xl:flex-row flex-col">
                    <Button
                        onClick={navigateToPlaylist}
                        label="Continue"
                        action="primary"
                    />
                     
                    <Button
                        onClick={untrackPlaylist}
                        label="Untrack"
                        action="secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserPlaylistsCards;
