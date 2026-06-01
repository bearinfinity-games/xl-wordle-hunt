import {useContext, useEffect, useState} from "react";
import {Puzzle} from "./Tiles";
import Keyboard from "./Keyboard";
import { WordleContext } from "./WordleContext";

const API_URL = "/wordle-api/api/fe/wordle-words";
function App() {
  const {tip, setWordle} = useContext(WordleContext);
  useEffect(() => {
    const fetchWordle = async () => {
      const response = await fetch(API_URL);
      const wordPool = await response.json();
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      setWordle(randomWord);
    }
    fetchWordle();
  }, []);

  return (
  <div className="App">
    <Puzzle trials={6} />
    <div>{tip}</div>
    <Keyboard/>
  </div>);

}

export default App;