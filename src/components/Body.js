import React from 'react'
// import Sidebar from './Sidebar'
import { useSelector, useDispatch } from "react-redux";
import MaineContainer from './MaineContainer'
import { FaBars } from "react-icons/fa";
import { Outlet } from 'react-router-dom'
import { toggleMenu } from "../utils/appSlice";
// import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify'
import Sidebar from "./newSidebar"
const Body = () => {
 const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
 const dispatch = useDispatch();
 const handleSidebarToggle = () => {
     // Dispatch the action to toggle the sidebar
     dispatch(toggleMenu());
 };
  return (
      <div className="flex h-screen">
          <div className={`flex-[15%] ${isMenuOpen ? "block" : "hidden"} h-[110%]`}>
              <Sidebar />
          </div>
          <div className="flex-[90%]">
              <div className="bg-[#1c212c] text-white py-4 pl-5">
                  <div className="flex items-center justify-end">
                      <button
                          onClick={handleSidebarToggle}
                          className="text-xl focus:outline-none mr-4  md:hidden lg:hidden xl:hidden"
                      >
                          <FaBars />
                      </button>
                  </div>
              </div>

              <div className="px-5 pt-2 h-[100%] overflow-y-hidden">
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
}

export default Body
