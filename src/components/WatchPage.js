import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Initialize the YouTube player
const WatchPage = () => {
    const [searchParams] = useSearchParams();
    return (
        <div className="flex flex-col w-full">
            <div className="px-5 flex">
                <div>
                    <iframe
                        id="player"
                        width="900"
                        height="500"
                        src={
                            "https://www.youtube.com/embed/" +
                            searchParams.get("v")
                        }
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                     
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
