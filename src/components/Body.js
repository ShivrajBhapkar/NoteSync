import React from 'react'
import Sidebar from './Sidebar'
import MaineContainer from './MaineContainer'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex gap-3'> 
      <Sidebar />
      <Outlet/>
    </div>
  )
}

export default Body
