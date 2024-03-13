import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assets/Ani.json";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user } = useUser();
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const saveUserToDb = async () => {
    try {
      const response = await axios.post("http://localhost:8800/user/new", {
        email: user.primaryEmailAddress,
        name: user.fullName,
        imageUrl: user.profileImageUrl,
        clerkId: user.id,
        interests: interests,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("interests", interests);
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Navbar />
      <div className=" w-[80%] flex justify-center items-center gap-44 container mx-auto">
        <Lottie
          options={defaultOptions}
          height={500}
          width={500}
          className="left-container bg-y"
        />
        <div
          className="right-container w-[60%]
           p-8
          flex flex-col justify-center items-start
    "
        >
          <h1 className="text-4xl font-bold my-8 pb-4 ">Welcome to GoTrips</h1>
          <div className="">
            <p className="text-xl my-4">What is your age?</p>
            <div className="flex flex-wrap">
              <input
                type="number"
                placeholder="18"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <div className="second mt-8">
            <p className="text-xl my-4">What are your interests?</p>
            <div className="flex flex-wrap">
              <button
                onClick={() => {
                  if (interests.includes("sports")) {
                    setInterests(
                      interests.filter((interest) => interest !== "sports")
                    );
                  } else {
                    setInterests([...interests, "sports"]);
                  }
                }}
                className={`btn btn-outline m-2 ${
                  interests.includes("sports") ? "btn-active" : ""
                }`}
              >
                Sports
              </button>
              <button
                onClick={() => {
                  if (interests.includes("music")) {
                    setInterests(
                      interests.filter((interest) => interest !== "music")
                    );
                  } else {
                    setInterests([...interests, "music"]);
                  }
                }}
                className={`btn btn-outline m-2 ${
                  interests.includes("music") ? "btn-active" : ""
                }`}
              >
                Music
              </button>
              <button
                onClick={() => {
                  if (interests.includes("travel")) {
                    setInterests(
                      interests.filter((interest) => interest !== "travel")
                    );
                  } else {
                    setInterests([...interests, "travel"]);
                  }
                }}
                className={`btn btn-outline m-2 ${
                  interests.includes("travel") ? "btn-active" : ""
                }`}
              >
                Travel
              </button>
              <button
                onClick={() => {
                  if (interests.includes("food")) {
                    setInterests(
                      interests.filter((interest) => interest !== "food")
                    );
                  } else {
                    setInterests([...interests, "food"]);
                  }
                }}
                className={`btn btn-outline m-2 ${
                  interests.includes("food") ? "btn-active" : ""
                }`}
              >
                Food
              </button>
            </div>

            <button
              onClick={() =>
                navigate("/onboarding/1", {
                  replace: true,
                  state: { interests: interests },
                })
              }
              className="mt-12 
            btn bg-black text-white
            w-[60%]  my-8"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
{
  /* 

<h1 className="text-4xl font-bold my-8">Welcome to GoTrips</h1>
        <div className="">
          <p className="text-xl my-4">What is your age?</p>
          <div className="flex flex-wrap">
            <button
              onClick={() => {
                if (interests.includes("sports")) {
                  setInterests(
                    interests.filter((interest) => interest !== "sports")
                  );
                } else {
                  setInterests([...interests, "sports"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("sports") ? "btn-active" : ""
              }`}
            >
              Sports
            </button>
            <button
              onClick={() => {
                if (interests.includes("music")) {
                  setInterests(
                    interests.filter((interest) => interest !== "music")
                  );
                } else {
                  setInterests([...interests, "music"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("music") ? "btn-active" : ""
              }`}
            >
              Music
            </button>
            <button
              onClick={() => {
                if (interests.includes("travel")) {
                  setInterests(
                    interests.filter((interest) => interest !== "travel")
                  );
                } else {
                  setInterests([...interests, "travel"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("travel") ? "btn-active" : ""
              }`}
            >
              Travel
            </button>
            <button
              onClick={() => {
                if (interests.includes("food")) {
                  setInterests(
                    interests.filter((interest) => interest !== "food")
                  );
                } else {
                  setInterests([...interests, "food"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("food") ? "btn-active" : ""
              }`}
            >
              Food
            </button>
          </div>
        </div>

        <div className="second">
          <p className="text-xl my-4">What are your interests?</p>
          <div className="flex flex-wrap">
            <button
              onClick={() => {
                if (interests.includes("sports")) {
                  setInterests(
                    interests.filter((interest) => interest !== "sports")
                  );
                } else {
                  setInterests([...interests, "sports"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("sports") ? "btn-active" : ""
              }`}
            >
              Sports
            </button>
            <button
              onClick={() => {
                if (interests.includes("music")) {
                  setInterests(
                    interests.filter((interest) => interest !== "music")
                  );
                } else {
                  setInterests([...interests, "music"]);
                }
              }}
              className={`btn btn-outline m-2 ${
                interests.includes("music") ? "btn-active" : ""
              }`}
            >
              Music
            </button>
            <button
              onClick={() => {
                if (interests.includes("travel")) {
                  setInterests(
                    interests.filter((interest) => interest !== "travel")
                  );
                } else {
                  setInterests([...interests, "travel"]);
                }
              }}
              className={`btn btn-ghost m-2 ${
                interests.includes("travel") ? "btn-active" : ""
              }`}
            >
              Travel
            </button>
            <button
              onClick={() => {
                if (interests.includes("food")) {
                  setInterests(
                    interests.filter((interest) => interest !== "food")
                  );
                } else {
                  setInterests([...interests, "food"]);
                }
              }}
              className={`btn btn-ghost m-2 ${
                interests.includes("food") ? "btn-active" : ""
              }`}
            >
              Food
            </button>
          </div>
        </div>

        <button onClick={saveUserToDb} className="btn btn-primary my-8">
          Save
        </button>
      </div> */
}
