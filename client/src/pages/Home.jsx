import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, doc, getDoc, setDoc } from "../firebase";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "../Earth";
import Navbar from "../components/Navbar";
import SearchIcon from "../icons/SearchIcon";
import upload from "../utils/upload";
import { Toaster, toast } from "react-hot-toast";
import TravelForm from "./TravelForm";

const Home = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState([]);

  const handleFile1 = async (e) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      data.append("upload_preset", "fiverr");
      const url = await upload(data);
      setImageUrl([...imageUrl, url]);
      console.log("url", url);
    }
    toast.success("File Uploaded");
  };

  console.log("imageUrl", imageUrl);

  const getPredictions = async (e) => {
    e.preventDefault();
    if (imageUrl.length === 0 && !destination) {
      toast.error("Please upload an image first!");
      return;
    }
    if (destination)
      return navigate(`/destination/${destination}`, {
        state: { location_name: destination },
      });
    const data = {
      image_url: imageUrl[0],
    };
    const response = await fetch(
      "https://htkzt4q6-5000.inc1.devtunnels.ms/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    setDestination(result.prediction);
    navigate(`/destination/${result.prediction}`, {
      state: { location_name: result.prediction },
    });
  };

  console.log("destination", destination);

  return (
    <div className="relative bg-[#0004] h-screen w-full overflow-x-hidden">
      {/* <Navbar /> */}
      <Toaster />
      <div className="h-screen w-full bg-black ">
        <Canvas shadows camera={{ position: [13, 5, 3], fov: 30 }}>
          <color attach="background" args={["#0f0f0f"]} />
          <OrbitControls maxZoom={90} minZoom={40} />
          <Model />
        </Canvas>
      </div>
      <div className="w-full absolute z-20 left-20 top-[16%] text-white p-4">
        <h1 className="font-extrabold text-6xl prevent-select text-[#76ABAE]">
          Want To Plan A Trip?
        </h1>
        <p className="text-3xl prevent-select font-bold tracking-wider text-[#434955] mt-6 pl-1">
          we are here to help
        </p>
        <p className="mt-2 text-xl prevent-select text-[#434955] tracking-wide pl-1">
          Plan your next unforgettable trip effortlessly and <br /> start making
          memories that last a lifetime
        </p>
        <label
          class="block prevent-select mt-8 relative w-1/3 justify-center border py-2 px-2 rounded-md gap-2 shadow-2xl focus-within:border-gray-300"
          for="search-bar"
        >
          <input
            onChange={(e) => setDestination(e.target.value)}
            id="search-bar"
            placeholder="enter your destination"
            class="px-2 py-1 w-full rounded-md text-white outline-none bg-transparent"
          />
        </label>

        <div className="flex items-center justify-center w-1/3 my-4">
          <hr className="w-28 opacity-45" />
          <p className="text-[#434955] font-bold text-sm tracking-wider mx-4">
            or
          </p>
          <hr className="w-28 opacity-45" />
        </div>

        <label
          class="block prevent-select relative w-1/3 justify-center border py-2 px-2 rounded-md gap-2 shadow-2xl focus-within:border-gray-300"
          for="search-bar"
        >
          <input
            onChange={handleFile1}
            type="file"
            placeholder="enter your destination"
            class="w-full rounded-md text-white outline-none bg-transparent"
          />
        </label>

        <button
          onClick={getPredictions}
          className="btn w-56 mt-8 text-black font-bold flex items-center justify-center gap-3"
        >
          <SearchIcon />
          Get Started
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
      </div>
    </div>
  );
};

export default Home;
