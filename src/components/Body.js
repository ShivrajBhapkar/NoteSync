import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./newSidebar";

const Body = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const handleSidebarToggle = () => {
        
        setShowSidebar(!showSidebar);
    };

    const handleHamburgerClick = () => {
        if (window.innerWidth <= 768) {
            console.log(window.innerWidth)
            handleSidebarToggle(); // Toggle the sidebar when the screen is less than medium
        }
    };

    useEffect(() => {
        // Check the window width and update the showSidebar state
        const handleWindowResize = () => {
            if (window.innerWidth <= 768) {
                // Adjust the width as per your medium breakpoint
                setShowSidebar(false);
            } else {
                setShowSidebar(true);
            }
        };

        // Add a listener for window resize
        window.addEventListener("resize", handleWindowResize);

        // Initialize showSidebar on component mount
        handleWindowResize();

        // Clean up the listener on component unmount
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <div className="flex h-screen">
            <div
                className={`md:flex-[15%] md:h-[100%] sm:h-[100%] lg:h-[110%] h-[110%] ${
                    showSidebar ? "block" : "hidden"
                }`}
            >
                <Sidebar />
            </div>
            <div className="flex-[90%]">
                <div className="bg-[#1c212c] text-white py-4 pl-5">
                    <div className="flex items-center justify-end">
                        <button
                            onClick={handleHamburgerClick}
                            className={`text-xl focus:outline-none mr-4 md:hidden lg:hidden xl:hidden`}
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
                <div className="px-5 pt-2 h-[98%] ">
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
