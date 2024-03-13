import React, { useState } from 'react';
import ResponsePg from './ResponsePg';

function TravelForm() {
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState([0, 1000]);
  const [foodType, setFoodType] = useState('');
  const [transportMode, setTransportMode] = useState('');
  const [isKidsAssociated, setIsKidsAssociated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const handleSliderChange = (event) => {
    setBudget(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Constructing the prompt string
    //   `Given the following parameters: User plane a detail trip to: ${destinationLocation} from ${startDate} to ${endDate}, number of people: ${numberOfPeople}, mode of transport: ${transportMode}, The traveller has a budget of ₹${budget}, and is interested in ${foodType}. Is associated with kids: ${isKidsAssociated}. Generate a complete trip day wise in which each day has a number of activities.`;

    const prompt = `
    Given the following parameters: User
    plane a detail trip to :  ${destinationLocation} from ${sourceLocation} starting from date ${startDate} and end date of trip ${endDate} ,number of people :${numberOfPeople},mode of transport :${transportMode}, i am having  budget  of ₹${budget} ,food type {foodType} , Is associated with kids: ${isKidsAssociated}
    generate a complete trip day wise in which each day has number of activities also give the flight links also all the links required in format given below
    The response shoulde be in a correct and perfect define  format with out any extra new line and spaces 
    the format of the response should be in  only 
    same as below example
        
    Give the response with flight link in the below pattern only \n refers to next line  \n\n refers to skip the next line
        
    flights info 
     Form:ngp airport \n
      to:Dubai airport \n
    return flights\n
     From:dubai airport \n
     to: nagpur airport \n\n
        
    flight to cost: 10000    \n
   flight  booking  links:   \n\n
        
    Stay Hotels Option \n\n
        
      Option 1:\n
        Hotel name: MaxCity Hotel  \n
        Price:5000/day    \n
        Booking Link: \n\n
        
      Option 2:\n
        Hotel name:Burj Arab\n
        Price: 100000/day   \n
        Booking Link: \n\n
        
    Trip Itineraries day wise: \n\n
         
    Day 1:\n\n
        
    Date:23/2/24    \n
    Total cost for Day: 20000   \n
    Food:\n
      details for whole day : \n
      Cost: 2000 rs   \n\n
          
      Day 1:\n
      Date: {date}\n
     Activity 1:\n 
    Description best desert of dubai    \n
      Start Time: {start time}\n
      End Time: {end time}\n
      Location: Desert Safari\n
       Latitute :20.12\n
      longitude:80.23\n
      Cost/Person: 100 Rs\n\n
          
      Activity 2:\n
      Description best desert of dubai    \n
      Start Time: {start time}\n
      End Time: {end time}\n
      Location: Skydive Dubai\n
        Latitute :20.12\n
      longitude:80.23\n
      Cost/Person: 600 Rs\n\n
          
      Total Day Cost for day1: 2800 Rs \n\n\n
        
        
      Day 2:\n
      Date: {date}\n
      Activity 1:\n
     Description best desert of dubai    \n
      Start Time: {start time}\n
      End Time: {end time}\n
      Location: Dubai Mall\n
       Latitute :20.12\n
      longitude:80.23\n
      Cost/Person: Free\n\n
          
      Activity 2:\n
     Description best desert of dubai    \n
      Start Time: {start time}\n
      End Time: {end time}\n
      Location: Burj Khalifa\n
       Latitute :20.12\n
      longitude:80.23\n
      Cost/Person: 1200 Rs\n\n
          
      Total Day 2Cost: 2400 Rs\n\n\n
        
      Total Budget of 2 days: 5200 Rs\n
  `;
  


      // Call getRequest function with the constructed prompt
      const generatedContent = await getRequest(prompt);
      console.log('Generated Content:', generatedContent);
      setGeneratedContent(generatedContent);

      // Reset form fields
      setSourceLocation('');
      setDestinationLocation('');
      setNumberOfPeople(1);
      setStartDate('');
      setEndDate('');
      setBudget([0, 1000]);
      setFoodType('');
      setTransportMode('');
      setIsKidsAssociated(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  async function getRequest(prompt) {
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=`;
    const headers = {
      'Content-Type': 'application/json'
    };
  
    try {
      const query = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      };
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(query)
      });
  
      if (response.ok) {
        const result = await response.json();
      const generatedContent = result.candidates[0].content.parts[0].text;
        console.log(generatedContent);
        return generatedContent; // Return the generated content as a string
      } else {
        throw new Error(`Error occurred: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error occurred: ${error.message}`);
    }
  }


  return (
<>
    {generatedContent ? (
      <ResponsePg generatedContent={generatedContent} />
    ) : (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="sourceLocation" className="block mb-1">Source Location:</label>
        <input type="text" id="sourceLocation" value={sourceLocation} onChange={(e) => setSourceLocation(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="destinationLocation" className="block mb-1">Destination Location:</label>
        <input type="text" id="destinationLocation" value={destinationLocation} onChange={(e) => setDestinationLocation(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfPeople" className="block mb-1">Number of People:</label>
        <input type="number" id="numberOfPeople" value={numberOfPeople} onChange={(e) => setNumberOfPeople(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-1">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block mb-1">End Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="budget" className="block mb-1">Budget:</label>
        <input type="range" id="budget" min={0} max={1000} value={budget} onChange={handleSliderChange} className="w-full" />
        <span className="block">Min: {budget[0]}, Max: {budget[1]}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="foodType" className="block mb-1">Food Type:</label>
        <input type="text" id="foodType" value={foodType} onChange={(e) => setFoodType(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="transportMode" className="block mb-1">Preferred Transport Mode:</label>
        <select id="transportMode" value={transportMode} onChange={(e) => setTransportMode(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
          <option value="">Select</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="flight">Flight</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="isKidsAssociated" className="block mb-1">
          <input type="checkbox" id="isKidsAssociated" checked={isKidsAssociated} onChange={(e) => setIsKidsAssociated(e.target.checked)} className="mr-2" />
          Kids associated
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>

      <div>
    
      </div>
    </form>

    )}
    </>
  );
}

export default TravelForm;



                   