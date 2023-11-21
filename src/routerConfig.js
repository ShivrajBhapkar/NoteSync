import React from "react";
import { HashRouter as Router, Route,Routes, Navigate } from "react-router-dom";
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

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />} // Render the HomePage component
                />
                <Route path="/dashboard" element={<Body />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute element={<UserTrackPlayList />} />
                        }
                    />
                    <Route
                        path="watch/:playlistId/:videoId"
                        element={<ProtectedRoute element={<NoteTakingApp />} />}
                    />
                    <Route
                        path="unTrack"
                        element={
                            <ProtectedRoute element={<UserUnTrackPlayList />} />
                        }
                    />
                    <Route
                        path="playlist/:playlistId"
                        element={
                            <ProtectedRoute element={<PlaylistVideos />} />
                        }
                    />
                </Route>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
