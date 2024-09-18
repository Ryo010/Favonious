import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import "./Home.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function Home() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  const handleSave = (value, index) => {
    const updatedNotes = [...savedNotes]; // Create a shallow copy of the array
    updatedNotes[index] = value;          // Update the specific note
    setSavedNotes(updatedNotes);          // Update state with the modified array
  };

  const handleDownload = () => {
    const file = new Blob([savedNotes.join("\n")], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'hello_world.txt');
  };

  return (
    <>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map((note, index) => (
            <EditTextarea
              key={index}
              value={note}  // This is the current note from the array
              onSave={({ value }) => handleSave(value, index)}  // Save the edited text back to the array
            />
          ))}
          <button onClick={handleDownload}>Download Note</button>
        </div>
      </div>
    </>
  );
}

export default Home;