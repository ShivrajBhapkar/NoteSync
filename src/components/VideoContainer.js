import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
    useEffect(() => {
        getVideos();
    }, []);
    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
      setVideos(json.items);
    };
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
              <Link key={video.id} to={"watch?v=" + video.id}>
                  <VideoCard info={video} />
              </Link>
          ))}
      </div>
  );
};

export default VideoContainer;
