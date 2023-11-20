import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./newSidebar";

const Body = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth <= 768
    );
    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };

    const handleHamburgerClick = () => {
        if (isSmallScreen) {
            handleSidebarToggle(); // Toggle the sidebar when the screen is less than medium
        }
    };

    useEffect(() => {
        const handleWindowResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                setShowSidebar(false);
                setIsSmallScreen(true);
            } else {
                setShowSidebar(true);
                setIsSmallScreen(false);
            }
        };

        window.addEventListener("resize", handleWindowResize);

        handleWindowResize();

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return (
        <div className="flex h-screen max-h-screen">
            <div
                className={`${
                    isSmallScreen ? "fixed inset-y-0 z-50" : ""
                } w-[60%] md:w-[15%] lg:w-[15%] xl:w-[15%] h-full ${
                    showSidebar ? "block" : "hidden"
                } bg-gray-800`}
            >
                <Sidebar
                    isSmallScreen={isSmallScreen}
                    handleHamburgerClick={handleHamburgerClick}
                />
            </div>
            <div className="flex-[90%]">
                <div className="bg-[#1c212c] text-white py-2 pl-5">
                    {!showSidebar && (
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleHamburgerClick}
                                className={`text-xl focus:outline-none mr-4 md:hidden lg:hidden xl:hidden`}
                            >
                                <FaBars />
                            </button>
                        </div>
                    )}
                </div>
                <div className="px-2 pt-2 h-[100%] ">
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
};

export default Body;
