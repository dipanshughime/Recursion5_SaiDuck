import {
  SignInButton,
  SignOutButton,
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

const Home = () => {
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();

  const checkUser = async () => {
    if (user != undefined) {
      const userData = {
        model: "sex",
      };
      const userCollection = "users";
      const userRef = doc(firestore, userCollection, user.id);
      await setDoc(userRef, userData, { merge: true });
      navigate("/");
    } else {
      console.log("no user");
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <div className="relative bg-[#0004] h-screen w-full overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="h-screen w-full bg-black ">
        <Canvas shadows camera={{ position: [13, 5, 3], fov: 30 }}>
          <color attach="background" args={["#0f0f0f"]} />
          <OrbitControls maxZoom={90} minZoom={40} />
          <Model />
        </Canvas>
      </div>
      <div className="w-full absolute z-20 left-20 top-[20%] text-white p-4">
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
            id="search-bar"
            placeholder="enter your destination"
            class="px-2 py-1 w-full rounded-md text-white outline-none bg-transparent"
          />
        </label>
        <button className="btn w-56 mt-6 text-black font-bold flex items-center justify-center gap-3">
          <SearchIcon />
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
