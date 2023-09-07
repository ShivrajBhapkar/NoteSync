import React from 'react'
import Sidebar from './Sidebar'
import MaineContainer from './MaineContainer'

const Body = () => {
  return (
    <div className='flex gap-3'> 
      <Sidebar />
      <MaineContainer/>
    </div>
  )
}

export default Body
