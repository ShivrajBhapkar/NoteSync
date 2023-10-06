import React from "react";
import Body from "./components/Body";
import MaineContainer from "./components/MaineContainer";
import WatchPage from "./components/WatchPage";
import Demo from "./components/Demo";
import UserUnTrackPlayList from "./components/UserUnTrackPlayList"
import LoginComponent from "./components/LoginComponent";
import { createBrowserRouter } from "react-router-dom";

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
                element: <WatchPage />,
            },
            {
                path: "demo",
                element: <Demo />,
            },
            {
                path: "UnTrack",
                element: <UserUnTrackPlayList />,
            },
            {
                path: "login",
                element: <LoginComponent/>,
            },
        ],
    },
]);

export default appRouter;
