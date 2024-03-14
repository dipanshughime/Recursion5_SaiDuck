import React, { useState, useEffect, useRef } from "react";
import "./ImageDescription.css"; // Import CSS file
// import Carousel from '../components/Carousel';
import axios from "axios";
import CarouselDefault from "../components/Carousel";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TravelForm from "./TravelForm";
import ChatBot from "./ChatBot";
import toast from "react-hot-toast";
// import 'dotenv/config';

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
  const messageRef = useRef(null);
  const [data, setData] = useState("");

  const getgptData = async () => {
    const body = {
      //"model":"gpt-3.5-turbo",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `give me a 1000 word description of ${location.state.location_name} including its history, geogrophical location and importance and much more as per wikipedia also give me how to reach there via various means of transport from andheri, mumbai if i will departure today.`,
        },
      ],
    };

    const headers = {
      Authorization:
        "Bearer",
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        body,
        { headers: headers }
      );

      setDescription(res.data.choices[0].message.content);
      setLoading(false);
    } catch (e) {
      console.log("err");
      toast.error("Error fetching data from OpenAI API");
    }
  };

  useEffect(() => {
    getgptData();
    const getLocation = async () => {
      try {
        if (messageRef.current) {
          messageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
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
  }, [location.state.location_name]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const prompt = `give me a one paragraph description of the ${location.state.location_name}`;
    //     const generatedContent = await getRequest(prompt);
    //     setDescription(generatedContent);
    //     const reachPrompt = `give me a route to reach the location ${location.state.location_name} from the location at latitude ${latitude}, longitude ${longitude} from time ${currentTime}, give the response in the form of a list like Bus 234 from Collector Colony bus stop at 10 am Take Flight of 10.45 am from Mumbai Airport to Agra You reach at your destination by 12 am`;
    //     const generatedReach = await getRequest(reachPrompt);
    //     setReach(generatedReach);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };
    // if (latitude !== null && longitude !== null) {
    //   fetchData();
    // }
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
    <div className="bg-[#000004] h-full">
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
            <div className="flex flex-col gap-2 mb-4">
              <div className="skeleton h-20 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ) : (
            <>
              <p className="mb-4 text-white">{description.split("\n\n")[0]}</p>
              <p className="mb-4 text-white">{description.split("\n\n")[1]}</p>
            </>
          )}
          <div className="grid grid-cols-3 w-2/3  mx-auto gap-4 my-10">
            <div className="flex gap-3 w-full bg-slate-200 items-center justify-start rounded-md p-4 shadow-sm">
              <img
                className="h-14 w-14  rounded-full"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Icon-mode-bus-default.svg/2048px-Icon-mode-bus-default.svg.png"
                alt=""
              />
              <div className="flex flex-col">800m from nearest Bus station</div>
            </div>

            <div className="flex gap-3 w-full bg-slate-200 items-center justify-start rounded-md p-4 shadow-sm">
              <img
                className="h-14 w-14  rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/3373/3373986.png"
                alt=""
              />
              <div className="flex flex-col">
                2.5km away from Agra Railway station
              </div>
            </div>

            <div className="flex gap-3 w-full bg-slate-200 items-center justify-start rounded-md p-4 shadow-sm">
              <img
                className="h-14 w-14  rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/7720/7720736.png"
                alt=""
              />
              <div className="flex flex-col">18km away from Delhi Airport</div>
            </div>
          </div>

          <button className="btn">
            <a href="https://65d48357fe477cbd8289b506--stellar-flan-1e2dae.netlify.app/">
              View on Interactive Mode
            </a>
          </button>

          <dialog id="my_modal_5" className="modal">
            <div
              ref={messageRef}
              className="modal-box bg-[#000004] h-2/3 no-scrollbar flex flex-col items-center"
            >
              <form method="dialog" className="ml-1/2">
                <h1 className="mb-6 mt-3 font-bold text-white text-center mx-auto">
                  Ask question related to this Location
                </h1>
                <button className="btn text-white btn-lg btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <ChatBot data={description} />
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ImageDescription;
