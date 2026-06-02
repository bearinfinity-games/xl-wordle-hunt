import {useContext, useEffect, useState} from "react";
import {Puzzle} from "./components/Tiles";
import Keyboard from "./components/Keyboard";
import { WordleContext } from "./context/WordleContext";

//const API_URL = "/wordle-api/api/fe/wordle-words";
const WORD_URL = "/words_alpha.txt";
function App() {
  const {difficulty, tip, setWordle} = useContext(WordleContext);
  useEffect(() => {
    const fetchWordle = async () => {
      const response = await fetch(WORD_URL);
      const text = await response.text();
      const wordPool = text.split('\n')
        .map(word => word.trim().toUpperCase())
        .filter(word=> word.length == difficulty+2);
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      setWordle(randomWord);
    }
    fetchWordle();
  }, []);

  return (
  <div className="App">
    <div>Difficulty {difficulty}, refresh to deal anew</div>
    <div>BACk button to edit, and ENTER to submit</div>
    <div>Orange tile - letter in wrong position</div>
    <div>Green tile - letter in correct position</div>
    <div>Wrong keys are highlighted on the keyboard.</div>
    <Puzzle/>
    <div>{tip}</div>
    <Keyboard/>
  </div>);

}

export default App;