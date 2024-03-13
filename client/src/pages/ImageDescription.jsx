import React, { useState, useEffect } from 'react';
import './ImageDescription.css'; // Import CSS file
// import Carousel from '../components/Carousel';
import axios from 'axios';
import CarouselDefault from '../components/Carousel';
import { useLocation } from 'react-router-dom';
const ImageDescription = () => {
    const location = useLocation();
    console.log(location.state.location_name)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [reach, setReach] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              setError(null);
            },
            (error) => {
              setError(error.message);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const getPhotos = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${location.state.location_name}`, {
          headers: {
            Authorization: `Client-ID zt_FmhK9BOzskTqqzSmJEqAFdFQ4Z_Oz64GnxH-IGpg`
          }
        });
        setPhotos(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    getLocation();
    getPhotos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prompt = `give me a one paragraph description of the ${location.state.location_name}`;
        const generatedContent = await getRequest(prompt);
        setDescription(generatedContent);

        const reachPrompt = `give me a route to reach the location ${location.state.location_name} from the location at latitude ${latitude}, longitude ${longitude} from time ${currentTime}, give the response in the form of a list like Bus 234 from Collector Colony bus stop at 10 am Take Flight of 10.45 am from Mumbai Airport to Agra You reach at your destination by 12 am`;
        const generatedReach = await getRequest(reachPrompt);
        setReach(generatedReach);

        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    if (latitude !== null && longitude !== null) {
      fetchData();
    }
  }, [latitude, longitude, currentTime, location.state.location_name]);

  const getRequest = async (prompt) => {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC_h976WfQ5wLi7s8Ha0JeFe4jT2vAj0wM';
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
        return generatedContent;
      } else {
        throw new Error(`Error occurred: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className='bg-[#000004]'>
    <div className="container mx-auto p-10 ">
        <div>

      <CarouselDefault images={photos} />
        </div>
      <div className="description-container mt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">{location.state.location_name}</h2>
        {loading ? (
          <div className="dot-spinner mb-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="dot-spinner__dot" />
            ))}
          </div>
        ) : (
          <>
            <p className="mb-4 text-white">{description}</p>
            <p className='text-white'><pre>{reach}</pre></p>
          </>
        )}
        {/* {error && <p className="text-red-500">Error: {error}</p>} */}
      </div>
    </div>
    </div>
  );
};

export default ImageDescription;
