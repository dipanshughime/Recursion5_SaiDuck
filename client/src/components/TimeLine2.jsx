import React from 'react'
import { Link } from 'react-router-dom';

const TimeLine2 = ({activity}) => {
  
  console.log(activity)
  const newAcitvity = activity.slice(1);
  // console.log(newAcitvity);
  // const splitData2 = newAcitvity[1].split("\n");
  // const splitData3 = splitData2[2].split(":");

  // const destination = splitData3[1];
  // console.log(destination);
  return (
    <>
      {newAcitvity.map((act, index) => {
        const splitData2 = act.split("\n");
        const splitData3 = splitData2[2].split(":");
      
        const destination = splitData3[1];
        return (
          <ul className="timeline timeline-vertical">
            
            <li>
            <div className="dropdown dropdown-hover">
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>{act}</li>
            </ul>
              <div tabIndex={0} role="button"  className={`timeline-${index % 2 == 0 ? "end" : "start"}` }>Activity{index+1}</div>
              </div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              </div>
              
            
              <div  className={`timeline-${index % 2 == 0 ? "start" : "end"} timeline-box`}>
              {/* <div tabIndex={0} role="button" className="btn m-1">{destination}</div> */}
              
                <Link to={`/destination/:${destination}`} state={{"location_name" : destination}}>{destination}</Link></div>
              
              <hr/>
            

            </li>
            
          </ul>
        )
        })}
    </>
    
  )
}

export default TimeLine2