import React from 'react'
import NavBar_M from './NavBar_M'
import Problem_K from './Problem_K'
import TextBox_K from './TextBox_K'

const CodeEditor_K = () => {
  const data={
    Name:'Third Maximum Number',
    Statement:'Given an integer array nums, find the third maximum number in this array. If the third maximum does not exist, return the maximum number instead.',
    Explanation:'The third maximum number in the array [3, 1, 2] is 1.',
    Constraints:'The length of the array nums is at least 3 and does not exceed 10^4.',
    Input:'The input consists of a single array of integers nums.',
    Output:'Returns an integer representing the third maximum number or the maximum number if the third maximum does not exist.'
  }
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <NavBar_M />
        <div className='flex w-full min-h-screen'>
            <Problem_K data={data}></Problem_K>
            <TextBox_K></TextBox_K>
        </div>
      </div>
    </>
  )
}

export default CodeEditor_K
