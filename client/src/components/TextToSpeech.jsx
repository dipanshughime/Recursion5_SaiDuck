import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance();
    setUtterance(newUtterance);
    return () => {
      if (utterance) {
        utterance.cancel();
      }
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

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

  return (
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleSpeak}>Speak</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;
