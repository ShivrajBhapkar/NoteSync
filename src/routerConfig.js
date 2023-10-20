import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Body from "./components/Body";
import MaineContainer from "./components/MaineContainer";
import WatchPage from "./components/WatchPage";
import NoteTakingApp from "./components/NoteTakingApp ";
import Demo from "./components/Demo";
import UserUnTrackPlayList from "./components/UserUnTrackPlayList";
import UserTrackPlayList from "./components/UserTrackPlayLists";
import LoginComponent from "./components/LoginComponent";
import PlaylistVideos from "./components/PlaylistVideos";
import { useSelector } from "react-redux";
import TokenService from "./Services/token.service";

  const ProtectedRoute = ({ element, ...rest }) => {
      const user = TokenService.getUser();
      if (user && user.userId) {
          return element;
      } else {
          return <Navigate to="/login" />;
      }
  };


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<UserTrackPlayList />} />,
            },
            {
                path: "watch/:playlistId/:videoId",
                element: <ProtectedRoute element={<NoteTakingApp />} />,
            },
            {
                path: "demo",
                element: <ProtectedRoute element={<Demo />} />,
            },
            {
                path: "unTrack",
                element: <ProtectedRoute element={<UserUnTrackPlayList />} />,
            },
            {
                path: "/playlist/:playlistId",
                element: <ProtectedRoute element={<PlaylistVideos />} />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginComponent />,
    },
]);

export default appRouter;
