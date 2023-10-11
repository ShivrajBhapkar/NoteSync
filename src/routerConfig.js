import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Body from "./components/Body";
import MaineContainer from "./components/MaineContainer";
import WatchPage from "./components/WatchPage";
import Demo from "./components/Demo";
import UserUnTrackPlayList from "./components/UserUnTrackPlayList";
import UserTrackPlayList from "./components/UserTrackPlayLists";
import LoginComponent from "./components/LoginComponent";
import PlaylistVideos from "./components/PlaylistVideos";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
    const userId = useSelector((store) => store.authentication.userId);

    if (userId !== null) {
        return element;
    } else {
        // Redirect unauthenticated users to the login page
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
                element: <MaineContainer />,
            },
            {
                path: "watch",
                element: <ProtectedRoute element={<WatchPage />} />,
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
                path: "track",
                element: <ProtectedRoute element={<UserTrackPlayList />} />,
            },
            {
                path: "/playlist/:playlistId",
                element:<ProtectedRoute element={<PlaylistVideos/>}/>
            },

            {
                path: "login",
                element: <LoginComponent />,
            },
        ],
    },
]);

export default appRouter;
