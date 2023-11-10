import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Body from "./components/Body";
import NoteTakingApp from "./components/NoteTakingApp ";
import UserUnTrackPlayList from "./components/UserUnTrackPlayList";
import UserTrackPlayList from "./components/UserTrackPlayLists";
import LoginComponent from "./components/LoginComponent";
import Register from "./components/Register";
import PlaylistVideos from "./components/PlaylistVideos";
import HomePage from "./pages/home-page";

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
        path: "/", // Change the path to the new root path "/"
        element: <HomePage />, // Render the HomePage component
    },
    {
        path: "/dashboard",
        element: <Body />,
        children: [
            {
                path: "/dashboard",
                element: <ProtectedRoute element={<UserTrackPlayList />} />,
            },
            {
                path: "watch/:playlistId/:videoId",
                element: <ProtectedRoute element={<NoteTakingApp />} />,
            },
            {
                path: "unTrack",
                element: <ProtectedRoute element={<UserUnTrackPlayList />} />,
            },
            {
                path: "playlist/:playlistId",
                element: <ProtectedRoute element={<PlaylistVideos />} />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginComponent />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default appRouter;
