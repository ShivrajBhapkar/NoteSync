import React from "react";

const VideoInfo = ({ videoInfo }) => {
    return (
        <div className=" p-2 rounded-lg shadow-sm border-2 border-solid border-gray-300">
            <h3 className="text-lg font-semibold">{videoInfo.videoTitle}</h3>
            <p className="text-sm text-gray-600">
                {videoInfo.videoDescription}
            </p>
            <p className="text-sm text-gray-600">{`Channel: ${videoInfo.channelTitle}`}</p>
        </div>
    );
};

export default VideoInfo;
