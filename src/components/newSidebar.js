import React from "react";

import { useNavigate , NavLink} from "react-router-dom";
import {
    FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../Services/auth";
import { MdPlaylistAddCheck, MdPlaylistRemove } from "react-icons/md";
const links = [
    {
        label: "Playlists",
        icon: <MdPlaylistAddCheck size={25} />,
        href: "/",
    },
    {
        label: "Untrack Playlists",
        icon: <MdPlaylistRemove size={25} />,
        href: "/untrack",
    },
];
const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        await logout();
        navigate("/login")
    };
    return (
        <aside className="shadow-lg  bg-[#1c212c]  flex flex-col  text-white  pt-5 border-collapse h-screen  max-h-screen  space-y-7">
            <div className="flex flex-col justify-between h-[100%]">
                <div className="flex flex-col space-y-7 mt-6 flex-[60%] items-start justify-start ">
                    {links.map((link, index) => (
                        <NavLink key={index} to={link.href} className="w-full">
                            <MenuItem icon={link.icon} text={link.label} />
                        </NavLink>
                    ))}
                </div>
                <hr className="text-gray-400" />
                <div className="flex  items-center flex-[30%] justify-center">
                    <button
                        className="flex w-[90%] text-red-500 space-x-2 items-center p-2"
                        onClick={handleLogin}
                    >
                        <FaSignOutAlt />
                        <span className="text-red-500">Log out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

const MenuItem = ({ icon, text }) => {
    return (
        <div className="w-full flex items-center gap-x-1.5 group select-none">
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
            </div>
            <div
                className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                href="#"
            >
                {icon}
                <span className="font-QuicksandMedium">{text}</span>
            </div>
        </div>
    );
};

export default Sidebar;
