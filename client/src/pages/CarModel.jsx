import React, { useState } from "react";
import { auth, firestore, doc, getDoc, setDoc } from "../firebase";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const CarModel = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  // State to manage the selected car model
  const [selectedModel, setSelectedModel] = useState("");

  // List of car models
  const carModels = [
    "ampere reo",
    "ather 450x",
    "bajaj chetak",
    "bounce infinity e1",
    "ford mustang mach-e premium",
    "hero electric flash lx",
    "honda benly e:",
    "hyundai kona electric",
    "kabira km4000",
    "niu nqi gts pro",
    "nissan leaf plus",
    "okinawa praisepro",
    "okinawa ridge+",
    "ola s1 air (3 kwh)",
    "ola s1 pro",
    "ola s1 x (3 kwh)",
    "ola s1 x (4 kwh)",
    "super soco tc max",
    "tvs iqube s",
    "tesla model 3 long range",
    "vespa elettrica",
  ];

  // Handle change in the selected car model
  const handleChange = (event) => {
    if (event && event.target && event.target.value) {
      setSelectedModel(event.target.value);
    }
  };

  const handleSubmit = async () => {
    console.log("selectedModel:", selectedModel);
    console.log("user:", user);
    console.log("user.uid:", user.id);
    if (selectedModel != "") {
      const userData = {
        model: selectedModel,
      };
      const userCollection = "users";

      const userRef = doc(firestore, userCollection, user.id);

      await setDoc(userRef, userData, { merge: true });

      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <label
          htmlFor="carModel"
          className="text-white mb-2 text-2xl font-bold"
        >
          Select Car Model:
        </label>
        <div className="flex gap-4 items-center justify-center">
          <select
            id="carModel"
            name="carModel"
            value={selectedModel}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select a car model</option>
            {carModels.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>

          <button className="btn bg-black text-white" onClick={handleSubmit}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarModel;
