import React from "react";
import { useSelector } from "react-redux";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import tokenService from "../Services/token.service";
const UserPlaylistsCards = ({ playlistInfo }) => {
   
    const { userId } = tokenService.getUser();
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
        <div className="relative p-2 m-2 w-72 h-74 shadow-lg overflow-hidden">
          
                <img
                    className="object-cover rounded-lg"
                    alt="thumbnail"
                    src={playlistInfo.playlistImageURL}
                />
           
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
