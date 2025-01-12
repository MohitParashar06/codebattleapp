import React from 'react'

const NavBar = () => {
  return (
    <>
      <div className='h-auto bg-[#2c2d2d] text-white text-2xl p-5 flex justify-between'>
          <div className='main_Logo'>
            <h1>code<span className='text-[#EA00FF]'>Construct</span></h1>
          </div>
          <div>
            <ul className='flex justify-between items-center text-lg'>
              <li className='mr-5'><a href='#'>Active Rooms</a></li>
              <li className='mr-5'><a href='#'>Problems</a></li>
              <li className='mr-5'><a href='#'>Contact</a></li>
              <li className='mr-5'><a href='#'>About Us</a></li>
            </ul>
          </div>
      </div>
    </>
  )
}

export default NavBar
