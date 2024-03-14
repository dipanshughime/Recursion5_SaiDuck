// import React from 'react'
// import * as tf from "@tensorflow/tfjs"
// import * as qna from "@tensorflow-models/qna"
// import Loader from 'react-loader-spinner'
// import {Frgment } from 'react'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// function ChatBot() {
//   return (
//     <div>ChatBot</div>
//   )
// }

// export default ChatBot
import React, { useRef, useEffect, useState } from "react";
// import logo from './logo.svg';
// import './Chatbot.css';

// 0. Install dependencies
// npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner

// 1. Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { Fragment } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const ChatBot = ({ data }) => {
  const { user } = useUser();

  // 3. Setup references and state hooks
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  // 4. Load Tensorflow Model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded.", loadedModel);
  };
  const [text, setText] = useState("");
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance();
    setUtterance(newUtterance);
  }, []);
  const handleSpeak = () => {
    if (!utterance) {
      return;
    }
    utterance.text = text;
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  };

  const handleStop = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  };

  const [yourQues, setYourQues] = useState([]);

  // 5. Handle Questions
  const answerQuestion = async (e) => {
    if (e.which === 13 && model !== null) {
      console.log("Question submitted.");

      const question = questionRef.current.value;
      setYourQues([
        ...yourQues,
        {
          by: "you",
          q: question,
        },
      ]);

      const answers = await model.findAnswers(question, data);

      setAnswer(answers);
      console.log("anser", answer);
      if (answers.length > 0) {
        setYourQues([
          ...yourQues,
          {
            by: "bot",
            q: answers,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    loadModel();
    // getgptData()
  }, []);

  // 2. Setup input, question and result area
  return (
    <div className=" h-2/3 bg-[#000004] w-full text-white text-center">
      <header className="w-full px-4  flex flex-col justify-end items-end">
        {model == null ? (
          <div className="h-2/3 w-full text-center">
            <div> Loading...</div>
            {/* <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}/> */}
          </div>
        ) : (
          <React.Fragment>
            <br />
            <div className="h-full overflow-y-scroll no-scrollbar w-full">
              {yourQues.length > 0 &&
                yourQues.map((q, i) => {
                  if (q.by == "bot") {
                    utterance.text = q.text;
                    speechSynthesis.speak(utterance);
                  }
                  console.log(q);
                  return (
                    <div className="w-full">
                      {q.by === "you" ? (
                        <p type="text" className="chat-bubble my-2">
                          {q.q}
                        </p>
                      ) : (
                        <div className=""></div>
                      )}
                      {q.by === "bot" ? (
                        <div className="chat chat-start ">
                          {q.q.length > 0 &&
                            q.q.map((res, index) => {
                              return (
                                <div key={index} className="chat-bubble my-2">
                                  {res.text}
                                </div>
                              );
                            })}
                          <img
                            className="h-14 w-14 rounded-full"
                            src="https://www.shutterstock.com/image-vector/chat-bot-logo-design-concept-600nw-1938811039.jpg"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className=""></div>
                      )}
                    </div>
                  );
                })}
            </div>
            <div
              className="sticky
           -bottom-8
            flex flex-col justify-end items-end"
            >
              <input
                ref={questionRef}
                type="text"
                className="
            px-2 py-1 w-[50%] mt-auto
            text-black ml-auto block rounded-md outline-none"
                onKeyPress={answerQuestion}
                size="80"
              ></input>
              <p className="flex items-center gap-2 mt-1">
                you
                {user && (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt="user"
                  />
                )}
              </p>
            </div>
          </React.Fragment>
        )}
      </header>
    </div>
  );
};

export default ChatBot;
