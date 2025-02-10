import React from 'react'
import NavBar_M from './NavBar_M'
import Problem_K from './Problem_K'
import TextBox_K from './TextBox_K'
import { useLocation } from 'react-router-dom'
import { getProblemWithGivenTitle } from '../apicalls/ProblemApi'
import { useState } from 'react'
import { useEffect } from 'react'
const CodeEditor_K = () => {
  const location=useLocation()
  const title=location.search.slice(7).split("%20").join(" ") 
  const [Data, setData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProblemWithGivenTitle({title:title});
        setData(response.message)
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <NavBar_M />
        <div className='flex w-full min-h-screen'>
            <Problem_K data={Data}></Problem_K>
            <TextBox_K></TextBox_K>
        </div>
      </div>
    </>
  )
}

export default CodeEditor_K
