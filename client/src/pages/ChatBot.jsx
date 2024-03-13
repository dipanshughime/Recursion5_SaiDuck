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
import React, {useRef, useEffect, useState} from 'react';
// import logo from './logo.svg';
import './ChatBot.css';

// 0. Install dependencies
// npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner

// 1. Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { Fragment } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';


const ChatBot = () => {
const {user} = useUser()

  // 3. Setup references and state hooks
  const passageRef = useRef(null); 
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState(); 
  const [model, setModel] = useState(null); 
  const [data, setData]= useState("")

  // 4. Load Tensorflow Model
  const loadModel = async ()=>{
    const loadedModel = await qna.load()
    setModel(loadedModel); 
console.log('Model loaded.',  loadedModel)
  } 
  const [text, setText] = useState('');
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


  const getgptData = async ()=>  {
   const body =  {  
        "model":"gpt-3.5-turbo",
        "messages": [
          { 
            "role": "user",
          "content": "give me a 2000 word description of taj mahal including its history, geogrophical location and importance and much more as per wikipedia also give me how to reach there via various means of transport from andheri, mumbai if i will departure today in simple words and in single paragraph"
           }]
    }

   const headers = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json" 
   }

 try {
    const res = await axios.post("https://api.openai.com/v1/chat/completions",body,{headers:headers})
    console.log(res.data.choices[0].message.content);
    setData(res.data.choices[0].message.content);
 }catch(e){
    console.log("err")
    toast.error("Error fetching data from OpenAI API");
 }
  }

  const [yourQues, setYourQues] = useState([])
  

  // 5. Handle Questions
  const answerQuestion = async (e) =>{
    if (e.which === 13 && model !== null ){
      console.log('Question submitted.')
      
      const question = questionRef.current.value
      setYourQues([...yourQues, {
        by: "you",
       q: question}]);

     
      console.log("data", data)
      console.log("question", question)

      const answers = await model.findAnswers(question, data)
    
      setAnswer(answers); 
      console.log("anser", answer);
      if(answers.length > 0 ) {
      setYourQues([...yourQues, {
        "by": "bot",
      q:  answers
      }])
    }
    }  
  }
 

  useEffect(()=>{
    loadModel()
    getgptData()
}, [])
 

 
  // 2. Setup input, question and result area
  return (
    <div className=" h-2/3 bg-[#000004] w-full text-white text-center">
      <header className="w-full px-4  flex flex-col justify-end items-end">
        {model ==null ? 
          <div className='h-2/3 w-full text-center'>
            <div> Loading...</div>      
            {/* <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}/> */}
          </div> 
          :  
          <React.Fragment>
        
           <h1 className='mb-6 mt-3 font-bold text-center mx-auto'>Ask question related 
           to this Location</h1>
         
            <br /> 
           <div className="h-full overflow-y-scroll no-scrollbar w-full">
           {yourQues.length > 0 &&
               yourQues.map((q,i)=>{
                if(q.by=='bot'){
                    utterance.text = q.text;
    speechSynthesis.speak(utterance);
                }
                console.log(q)
                   return <div className="w-full">
                        {
                            q.by === "you" ?           <p
                            type='text'
                            className='bg-red-500 my-2
                                    px-2 py-1 w-[50%]
                                    text-white ml-auto block rounded-md outline-none'>
                                {q.q}
                             </p>
                            : <div className=""></div>
                        }
                        {
                            q.by === "bot" ?

                            <div className="flex flex-col items-start">

                            {
                                q.q.length > 0 && 
                                q.q.map((res, index)=>{
                                    return <div 
                            
                                    className='bg-red-500 my-2
                                    px-2 py-1 w-[50%]
                                    text-white mr-auto block rounded-md outline-none'>
                                        
                                     {
                                        res.text
                                        
                                    }</div>
                                  
                                })
                                    
                            }
                            <img 
                            className='h-14 w-14 rounded-full'
                            src="https://www.shutterstock.com/image-vector/chat-bot-logo-design-concept-600nw-1938811039.jpg" alt="" />
                            </div>: 
                            <div className=""></div>
                        }
                    </div>}
                )
            }
           </div>
           <div
           
           className="sticky
           -bottom-8
            flex flex-col justify-end items-end">
          <input ref={questionRef}
            type='text'
            className='
            px-2 py-1 w-[50%] mt-auto
            text-black ml-auto block rounded-md outline-none'
            onKeyPress={answerQuestion} size="80"></input>
            <p>you 

               {
                user && <img src={user.imageUrl} alt="user" />
               }
            </p>
          </div>
            </React.Fragment>
        } 
      </header>
    </div>
  );
}

export default ChatBot