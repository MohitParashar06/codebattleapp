import React from 'react'
import ProblemCard_K from './ProblemCard_K';
import { useState } from 'react';
const Problem_K = (props) => {
    const data=props.data

    const [Active,setActive]=useState("Problems")
  return (
    <div className='w-1/3 h-full flex flex-col'>
        <div  className=' bg-gray-900 text-white py-2 pl-4 flex items-center space-x-8'>
                {['Problems', 'Submissions', 'Solution'].map((item) => (
                <div
                    key={item}
                
                    className="text-md text-gray-300 hover:text-purple-500 transition duration-300"
                >
                    {item}
                </div>
                ))}
        </div>
        <ProblemCard_K data={data}></ProblemCard_K>
    </div>
  )
}

export default Problem_K
