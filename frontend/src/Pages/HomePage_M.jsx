import React from 'react'
import NavBar from './NavBar_M'
import BodyContent_M from './BodyContent_M'
const HomePage_M = () => {
  return (
    <>
      <div className='bg-black h-[100vh]'>
      <NavBar></NavBar>
      <div className='flex items-center justify-center h-[75vh]'>

      <BodyContent_M></BodyContent_M>
      </div>
      </div>
    </>
  )
}

export default HomePage_M
