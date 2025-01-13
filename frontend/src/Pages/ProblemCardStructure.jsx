import React from 'react'

const ProblemCardStructure = (props) => {
  return (
    <div className='flex flex-col gap-5'>
        <p className='font-bold'>{props.info} :</p>
        <div>{props.value}</div>
    </div>
  )
}

export default ProblemCardStructure
