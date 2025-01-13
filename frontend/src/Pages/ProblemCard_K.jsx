import React from 'react'
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import ProblemCardStructure from './ProblemCardStructure';
const ProblemCard_K = (props) => {
  const data=props.data
  return (
    <div className='bg-gray-800 w-full h-full text-white flex flex-col gap-5 pl-3 pt-3 pb-12 '>
        <div className='flex item-center text-xl font-bold'>
            <h1>1. {data.Name}</h1>
            <div className='flex gap-x-3 items-center justify-center'>
                <AiTwotoneLike />
                <AiTwotoneDislike />
            </div>
        </div>
       <p>{data.Statement}</p>
       <div className='flex flex-col gap-2'>
         <p className='font-bold'>Example 1 :</p>
         <div className='flex gap-10'>
            <div className='w-40 h-40 rounded-lg flex justify-center items-center bg-gray-700'>Input</div>
            <div className='w-40 h-40 rounded-lg flex justify-center items-center bg-gray-700'>Output</div>
         </div>
       </div>
       <ProblemCardStructure info={'Explanation'} value={data.Explanation}></ProblemCardStructure>
       <ProblemCardStructure info={'Constraints'} value={data.Constraints}></ProblemCardStructure>
       <ProblemCardStructure info={'Input Format'} value={data.Input}></ProblemCardStructure>
       <ProblemCardStructure info={'Output Format'} value={data.Output}></ProblemCardStructure>
    </div>
  )
}

export default ProblemCard_K
