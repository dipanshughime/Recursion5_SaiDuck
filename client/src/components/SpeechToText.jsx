// import React, { useState } from "react";

// const Example = () => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const recognition = new window.webkitSpeechRecognition();

//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.lang = "en-US";

//   recognition.onstart = () => {
//     setIsListening(true);
//   };

//   recognition.onerror = (event) => {
//     console.error("Speech recognition error detected: ", event.error);
//     setIsListening(false);
//   };

//   recognition.onend = () => {
//     setIsListening(false);
//   };

//   recognition.onresult = (event) => {
//     let interimTranscript = "";
//     for (let i = event.resultIndex; i < event.results.length; i++) {
//       const transcript = event.results[i][0].transcript;
//       if (event.results[i].isFinal) {
//         setText(transcript);
//       } else {
//         interimTranscript += transcript;
//       }
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleListening}>
//         {isListening ? "Stop Listening" : "Start Listening"}
//       </button>
//       <p>{text}</p>
//     </div>
//   );
// };

// export default Example;
// // import { useState } from 'react';
// //   import { useSpeechRecognition } from 'react-speech-kit';
    
// //   function Example() {
// //    const [value, setValue] = useState('')
// //    const { listen, stop } = useSpeechRecognition({
// //      onResult: (result) => {
// //        setValue(result)
// //      }
// //    })
    
// //    return (
// //      <div>
// //        <textarea
// //          value={value}
// //          onChange={(event) => setValue(event.target.value)}
// //         />
// //         <button onMouseDown={listen} onMouseUp={stop}>
// //           🎤
// //         </button>
// //        </div>
// //       )
// //     }

// import React, { useState, useEffect } from 'react';

// const TextToSpeech = () => {
//   const [text, setText] = useState('');
//   const [utterance, setUtterance] = useState(null);

//   useEffect(() => {
//     const newUtterance = new SpeechSynthesisUtterance();
//     setUtterance(newUtterance);
//     return () => {
//       if (utterance) {
//         utterance.cancel();
//       }
//     };
//   }, []);

//   const handleTextChange = (event) => {
//     setText(event.target.value);
//   };

//   const handleSpeak = () => {
//     if (!utterance) {
//       return;
//     }
//     utterance.text = text;
//     speechSynthesis.speak(utterance);
//   };

//   const handlePause = () => {
//     if (speechSynthesis.speaking) {
//       speechSynthesis.pause();
//     }
//   };

//   const handleStop = () => {
//     if (speechSynthesis.speaking) {
//       speechSynthesis.cancel();
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={handleTextChange} />
//       <button onClick={handleSpeak}>Speak</button>
//       <button onClick={handlePause}>Pause</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };

// export default TextToSpeech;