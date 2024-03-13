import React, { useState, useEffect } from "react";
import "./ImageDescription.css"; // Import CSS file
// import Carousel from '../components/Carousel';
import axios from "axios";
import CarouselDefault from "../components/Carousel";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
const ImageDescription = () => {
  const location = useLocation();
  console.log(location.state.location_name);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [reach, setReach] = useState("");
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
          setError("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const getPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${location.state.location_name}`,
          {
            headers: {
              Authorization: `Client-ID zt_FmhK9BOzskTqqzSmJEqAFdFQ4Z_Oz64GnxH-IGpg`,
            },
          }
        );
        setPhotos(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching photos:", error);
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
  }, []);

  const getRequest = async (prompt) => {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC_h976WfQ5wLi7s8Ha0JeFe4jT2vAj0wM";
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
        return generatedContent;
      } else {
        throw new Error(`Error occurred: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Error occurred: ${error.message}`);
    }
  };

  return (
    <div className="bg-[#000004] h-screen">
      <Navbar />
      <div className="flex flex-col mx-auto p-10 ">
        <div className="flex w-full gap-3 mt-8">
          {photos &&
            photos.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="
              w-150 h-80 object-cover rounded-lg bg-slate-600
              "
              >
                <img
                  src={image.urls.raw}
                  alt={`${index}`}
                  className="object-cover h-80 w-150 rounded-lg"
                />
              </div>
            ))}
        </div>
        <div className="description-container mt-8">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            {location.state.location_name.toString().toUpperCase()}
          </h2>
          {loading ? (
            <div className="dot-spinner mb-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="dot-spinner__dot" />
              ))}
            </div>
          ) : (
            <>
              <p className="mb-4 text-white">{description}</p>
              <p className="text-white">
                <span className="font-bold mr-7">How to reach:</span>
                <ul className="steps steps-vertical">
                  <section className="dark:bg-gray-800 dark:text-gray-100">
                    <div className="container mx-auto flex flex-col p-6">
                      <h2 className="py-4 text-3xl font-bold text-center">
                        Temporibus elit
                      </h2>
                      <div className="divide-y dark:divide-gray-700">
                        <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                          <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              className="w-16 h-16"
                            >
                              <path d="M472,16H168a24,24,0,0,0-24,24V344a24,24,0,0,0,24,24H472a24,24,0,0,0,24-24V40A24,24,0,0,0,472,16Zm-8,320H176V48H464Z"></path>
                              <path d="M112,400V80H80V408a24,24,0,0,0,24,24H432V400Z"></path>
                              <path d="M48,464V144H16V472a24,24,0,0,0,24,24H368V464Z"></path>
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracking-wider uppercase dark:text-violet-400">
                              Step 1 - Nihil
                            </span>
                            <span className="text-xl font-bold md:text-2xl">
                              Veritatis dolores
                            </span>
                            <span className="mt-4 dark:text-gray-300">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aperiam facilis, voluptates error alias
                              dolorem praesentium sit soluta iure incidunt
                              labore explicabo eaque, quia architecto veritatis
                              dolores, enim cons equatur nihil ipsum.
                            </span>
                          </div>
                        </div>
                        <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                          <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              className="w-16 h-16"
                            >
                              <path d="M285.177,179l15.513-3.914-7.827-31.028-15.514,3.913a176.937,176.937,0,0,0-129.3,133.557l-3.407,15.633,31.266,6.814,3.406-15.634A145.559,145.559,0,0,1,285.177,179Z"></path>
                              <path d="M363.624,147.871C343.733,72.077,274.643,16,192.7,16,95.266,16,16,95.266,16,192.7c0,82.617,57,152.163,133.735,171.4A176.769,176.769,0,0,0,320.7,496c97.431,0,176.7-79.266,176.7-176.695C497.392,238.071,441.64,167.336,363.624,147.871ZM48,192.7C48,112.91,112.91,48,192.7,48s144.7,64.91,144.7,144.7-64.911,144.7-144.7,144.7S48,272.481,48,192.7ZM320.7,464c-60.931,0-115.21-38.854-135.843-94.792,2.6.115,5.214.184,7.843.184a176.862,176.862,0,0,0,32.7-3.047l97.625,97.625C322.247,463.983,321.473,464,320.7,464Zm41.528-6.083L260.26,355.954a176.9,176.9,0,0,0,43.662-26.072L408.37,434.33A144.385,144.385,0,0,1,362.223,457.917Zm69.3-45.692L326.851,307.557a177.082,177.082,0,0,0,27.911-44.5L457.67,365.964A144.661,144.661,0,0,1,431.519,412.225Zm33.594-84.073-99.42-99.42a176.785,176.785,0,0,0,3.7-36.036c0-3.285-.1-6.547-.276-9.787a145.054,145.054,0,0,1,96.276,136.4C465.392,322.276,465.291,325.224,465.113,328.152Z"></path>
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracking-wider uppercase dark:text-violet-400">
                              Step 2 - Explicabo
                            </span>
                            <span className="text-xl font-bold md:text-2xl">
                              Iure incidunt labore
                            </span>
                            <span className="mt-4 dark:text-gray-300">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aperiam facilis, voluptates error alias
                              dolorem praesentium sit soluta iure incidunt
                              labore explicabo eaque, quia architecto veritatis
                              dolores, enim cons equatur nihil ipsum.
                            </span>
                          </div>
                        </div>
                        <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                          <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              className="w-16 h-16"
                            >
                              <path d="M412.284,294.37l-12.5,15.642c-8.354,10.454-50.027,64.208-50.027,95.883,0,36.451,28.049,66.105,62.526,66.105s62.527-29.654,62.527-66.105c0-31.675-41.673-85.429-50.028-95.883Zm0,145.63c-16.832,0-30.526-15.3-30.526-34.105,0-11.662,15.485-37.883,30.531-59.2,15.043,21.3,30.522,47.509,30.522,59.2C442.811,424.7,429.116,440,412.284,440Z"></path>
                              <path d="M122.669,51.492,96.133,124.4,30.092,97.205,17.908,126.8l67.271,27.7L26.9,314.606a48.056,48.056,0,0,0,28.689,61.523l184.719,67.232a48,48,0,0,0,61.523-28.688L397.6,151.56Zm149.1,352.236a16,16,0,0,1-20.508,9.563L66.537,346.059a16,16,0,0,1-9.563-20.507L73.553,280H316.8ZM85.2,248l29.594-81.311,36.333,14.961a32.644,32.644,0,1,0,11.236-29.98l-36.615-15.077,16.046-44.085,214.79,78.177L328,249.219V248Z"></path>
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracking-wider uppercase dark:text-violet-400">
                              Step 3 - Facilis
                            </span>
                            <span className="text-xl font-bold md:text-2xl">
                              Dolorem praesentium
                            </span>
                            <span className="mt-4 dark:bg-gray-800 dark:text-gray-300">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aperiam facilis, voluptates error alias
                              dolorem praesentium sit soluta iure incidunt
                              labore explicabo eaque, quia architecto veritatis
                              dolores, enim cons equatur nihil ipsum.
                            </span>
                          </div>
                        </div>
                        <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                          <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              className="w-16 h-16"
                            >
                              <polygon points="388.632 393.82 495.823 255.94 388.684 118.178 363.424 137.822 455.288 255.944 363.368 374.18 388.632 393.82"></polygon>
                              <polygon points="148.579 374.181 56.712 255.999 148.629 137.823 123.371 118.177 16.177 255.993 123.314 393.819 148.579 374.181"></polygon>
                              <polygon points="330.529 16 297.559 16 178.441 496 211.412 496 330.529 16"></polygon>
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                            <span className="text-xs tracking-wider uppercase dark:text-violet-400">
                              Step 4 - Aperiam
                            </span>
                            <span className="text-xl font-bold md:text-2xl">
                              Explicabo eaque
                            </span>
                            <span className="mt-4 dark:text-gray-300">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aperiam facilis, voluptates error alias
                              dolorem praesentium sit soluta iure incidunt
                              labore explicabo eaque, quia architecto veritatis
                              dolores, enim cons equatur nihil ipsum.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* {reach
                    .split(". ")
                    .slice(1, reach.length - 1)
                    .map((step, index) => (
                      <span key={index}>
                        <li className="step step-primary">
                          {" "}
                          {step
                            .trim()
                            .toString()
                            .substring(0, step.trim().length - 1)}
                        </li>

                        <br />
                      </span>
                    ))} */}
                </ul>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDescription;
