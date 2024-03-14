// import React from 'react'

// function ResponsePg() {
// const Location = useLocation
//   return (
//     <div className="max-w-lg mx-auto">
//     <h2>Generated Content:</h2>
//     <pre>
//         {generatedContent}
//     </pre>
//   </div>
//   )
// }

// export default ResponsePg




import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import Navbar from '../components/Navbar';
import TimeLine from '../components/TimeLine';

const ResponsePg = ({ generatedContent }) => {
  const Location = useLocation();
 
  
  const response = Location.state.response;
  // console.log(response);
  // Parse the response data
  const days = response.split('xx');
  const newDays = days.slice(1);

  console.log(newDays)
  return (
    <>
    <Navbar />
    {/* <div className='flex flex-column justify-around align-center mt-20'> */}
    <div className='flex flex-column justify-center align-center mt-18 mb-20'>
      <DetailsCard details = {days[0]}/>
      {days.map((day, index) => (
        <div key={index} className="card">
    
              {/* <p>{day}</p> */}
              
            </div>
          ))}
      </div>

      <TimeLine days = {newDays}/>

    {/* </div> */}
          </>
    );
};

export default ResponsePg;