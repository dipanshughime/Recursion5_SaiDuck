
// import React, { useRef, useEffect, useState } from "react";
// // import logo from './logo.svg';
// import "./Chatbot.css";

// // 0. Install dependencies
// // npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner

// // 1. Import dependencies
// import * as tf from "@tensorflow/tfjs";
// import * as qna from "@tensorflow-models/qna";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// // import Loader from "react-loader-spinner";
// import { Fragment } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ChatBot = () => {
//   // 3. Setup references and state hooks
//   const passageRef = useRef(null);
//   const questionRef = useRef(null);
//   const [answer, setAnswer] = useState();
//   const [model, setModel] = useState(null);
//   const [data, setData] = useState("");

//   // 4. Load Tensorflow Model
//   const loadModel = async () => {
//     const loadedModel = await qna.load();
//     setModel(loadedModel);
//     console.log("Model loaded.", loadedModel);
//   };

//   const getgptData = async () => {
//     const body = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content:
//             "give me a 2000 word description of taj mahal including its history, geogrophical location and importance and much more as per wikipedia also give me how to reach there via various means of transport from andheri, mumbai if i will departure today in simple words and in single paragraph",
//         },
//       ],
//     };

//     const headers = {
//       Authorization:
//       "Content-Type": "application/json",
//     };

//     try {
//       const res = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         body,
//         { headers: headers }
//       );
//       console.log(res.data.choices[0].message.content);
//       setData(res.data.choices[0].message.content);
//     } catch (e) {
//       console.log("err");
//       toast.error("Error fetching data from OpenAI API");
//     }
//   };

//   // 5. Handle Questions
//   const answerQuestion = async (e) => {
//     if (e.which === 13 && model !== null) {
//       console.log("Question submitted.");

//       const question = questionRef.current.value;

//       console.log("data", data);
//       console.log("question", question);

//       const answers = await model.findAnswers(question, data);
//       setAnswer(answers.first);
//       console.log(answers);
//     }
//   };

//   useEffect(() => {
//     loadModel();
//     getgptData();
//   }, []);

//   // 2. Setup input, question and result area
//   return (
//     <div className="App">
//       <header className="App-header">
//         {model == null ? (
//           <div>
//             <div>Model Loading</div>
//             {/* <Loader
//             type="Puff"
//             color="#00BFFF"
//             height={100}
//             width={100}/> */}
//           </div>
//         ) : (
//           <React.Fragment>
//             Ask a Question
//             <input
//               ref={questionRef}
//               onKeyPress={answerQuestion}
//               size="80"
//             ></input>
//             <br />
//             Answers
//             {answer
//               ? answer.map((ans, idx) => (
//                   <div key={idx}>
//                     <b>Answer {idx + 1} - </b> {ans.text} (
//                     {Math.floor(ans.score * 100) / 100})
//                   </div>
//                 ))
//               : ""}
//           </React.Fragment>
//         )}
//       </header>
//     </div>
//   );
// };

// export default ChatBot;
