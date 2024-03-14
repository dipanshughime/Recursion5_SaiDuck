import React from 'react'
import TimeLine2 from './TimeLine2'

const DayDetailCard = ({day}) => {

  const splitData = day.split("Activity");

  return (
    <div className="card w-100 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{splitData[0]}</h2>
        <TimeLine2 activity= {splitData}/>
        
        <div className="card-actions justify-end">
         
        </div>
      </div>
    </div>
  )
}

export default DayDetailCard