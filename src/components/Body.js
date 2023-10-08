import React from 'react'
import Sidebar from './Sidebar'
import MaineContainer from './MaineContainer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const Body = () => {
  return (
      <div className="flex gap-3">
          <Sidebar />
          <Outlet />
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
