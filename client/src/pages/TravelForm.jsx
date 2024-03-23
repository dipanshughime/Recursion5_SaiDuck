import React, { useState } from "react";
import ResponsePg from "./ResponsePg";
import { useNavigate } from "react-router-dom";

function TravelForm() {
  const navigate = useNavigate();
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState([0, 1000]);
  const [foodType, setFoodType] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [isKidsAssociated, setIsKidsAssociated] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
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
      The response shoulde be in a correct and perfect define  format with out any extra new line and spaces , in description : of activity only give the place name
      the format of the response should be in only always put xx in front of day and dont give **(bold) font and put && before and after all flight booking links and put && before and after all the hotel booking links
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
          
      
            
        xxDay 1:\n
        Date: {date}\n
       Activity 1:\n 
      Description :best desert of dubai    \n
        Start Time: {start time}\n
        End Time: {end time}\n
        Location: Desert Safari\n
        
        Cost/Person: 100 Rs\n\n
            
        Activity 2:\n
        Description: best desert of dubai    \n
        Start Time: {start time}\n
        End Time: {end time}\n
        Location: Skydive Dubai\n
     
        Cost/Person: 600 Rs\n\n
            
        Total Day Cost for day1: 2800 Rs \n\n\n
          
          
        xxDay 2:\n
        Date: {date}\n
        Activity 1:\n
       Description :best desert of dubai    \n
        Start Time: {start time}\n
        End Time: {end time}\n
        Location: Dubai Mall\n
       
        Cost/Person: Free\n\n
            
        Activity 2:\n
       Description : best desert of dubai    \n
        Start Time: {start time}\n
        End Time: {end time}\n
        Location: Burj Khalifa\n
       
        Cost/Person: 1200 Rs\n\n
            
        Total Day 2Cost: 2400 Rs\n\n\n
          
        Total Budget of 2 days: 5200 Rs\n
    `;

      // Call getRequest function with the constructed prompt
      const generatedContent = await getRequest(prompt);
      console.log("Generated Content:", generatedContent);
      setGeneratedContent(generatedContent);

      navigate("/res", {
        state: { response: generatedContent },
      });

      // Reset form fields
      setSourceLocation("");
      setDestinationLocation("");
      setNumberOfPeople(1);
      setStartDate("");
      setEndDate("");
      setBudget([0, 1000]);
      setFoodType("");
      setTransportMode("");
      setIsKidsAssociated(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function getRequest(prompt) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCBMhFeEw_AqvxOlO5LrIXE_PQisMEHarE`;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const query = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(query),
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
      <form
        onSubmit={handleSubmit}
        className="max-w-sm
         text-slate-300
        "
      >
        <div className="flex items-center justify-center gap-3">
          <div className="mb-4">
            <label
              htmlFor="sourceLocation"
              className="block mb-1 text-slate-500"
            >
              Source Location:
            </label>
            <input
              type="text"
              id="sourceLocation"
              value={sourceLocation}
              onChange={(e) => setSourceLocation(e.target.value)}
              className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="destinationLocation"
              className="block mb-1 text-slate-500"
            >
              Destination Location:
            </label>
            <input
              type="text"
              id="destinationLocation"
              value={destinationLocation}
              onChange={(e) => setDestinationLocation(e.target.value)}
              className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="mb-4">
            <label
              htmlFor="numberOfPeople"
              className="block mb-1 text-slate-500"
            >
              Number of People:
            </label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-1 text-slate-500">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-1 text-slate-500">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget" className="block mb-1 text-slate-500">
            Budget:
          </label>
          <input
            type="range"
            id="budget"
            min={0}
            max={1000}
            value={budget}
            onChange={handleSliderChange}
            className="w-full"
          />
          <span className="block">
            Min: {budget[0]}, Max: {budget[1]}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-4 w-[40%]">
            <label htmlFor="foodType" className="block mb-1 text-slate-500">
              Food Type:
            </label>
            <input
              type="text"
              id="foodType"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full px-3 bg-transparent py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="transportMode"
              className="block mb-1 text-slate-500"
            >
              Preferred Transport Mode:
            </label>
            <select
              id="transportMode"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="w-full bg-transparent px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="isKidsAssociated"
            className="block mb-1 text-slate-500"
          >
            <input
              type="checkbox"
              id="isKidsAssociated"
              checked={isKidsAssociated}
              onChange={(e) => setIsKidsAssociated(e.target.checked)}
              className="mr-2 bg-transparent"
            />
            Kids associated
          </label>
        </div>
        <button
          type="submit"
          className="btn w-full mt-8 text-black font-bold flex items-center justify-center gap-3"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default TravelForm;
