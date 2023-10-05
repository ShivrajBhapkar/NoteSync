import React from "react";

const UserVideoCards = ({ playlistInfo }) => {
    // const { snippet, statistics } = info;
    // const { channelTitle, title, thumbnails } = snippet;

    return (
        <div className="p-2 m-2 w-72 shadow-lg">
            <img
                className="rounded-lg"
                alt="thumbnail"
                src={playlistInfo.playlistImageURL}
            />
            <ul>
                <li className="font-bold ">{playlistInfo.playlistTitle}</li>
                {/* <li>{channelTitle}</li> */}
            </ul>
        </div>
    );
};

export default UserVideoCards;
