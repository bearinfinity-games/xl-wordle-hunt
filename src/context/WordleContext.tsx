import {createContext, useState, useEffect} from "react";

type WordleContextType = {
    activeTile: number;
    setActiveTile: React.Dispatch<React.SetStateAction<number>>;
    newKey: string;
    setNewKey: React.Dispatch<React.SetStateAction<string>>;
    keyHistory: Record<string, string>;
    tip: string;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setWordle: React.Dispatch<React.SetStateAction<string>>;
    keyStyle: Record<string, string>;
    difficulty: number;
    setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}
const WordleContext = createContext<WordleContextType>(undefined)
function WordleContextProvider({children}: any) {
    const [activeTile, setActiveTile] = useState(0);
    const [newKey, setNewKey] = useState('');
    const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [difficulty, setDifficulty] = useState(levels[Math.floor(Math.random()*levels.length)]);
    const [currentGuess, setCurrentGuess] = useState(Array(difficulty+2).fill(''))
    const [tip, setTip] = useState('Tap key to find ME!');
    const [submitted, setSubmitted] = useState(false);
    const [wordle, setWordle] = useState('');
    let initialKeyHistory: Record<number, Record<string, string>> = {}
    for (let i:number = 0; i<((difficulty+2)*(difficulty+3)); i++){
        initialKeyHistory[i] = {item: '', color: ''};
    }
    const [keyHistory, setKeyHistory] = useState(initialKeyHistory)
    const [trial, setTrial] = useState(0);
    const KEYS: string = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let keyStyleColor: Record<string, string> = {};
    for (let KEY of KEYS) {
        keyStyleColor[KEY] = '';
    }
    const [keyStyle, setKeyStyle] = useState(keyStyleColor);
    //console.log(keyStyle);
    useEffect(()=>{
        if (activeTile == -1) {
            //setTip('Press Enter to submit.');
        }else if(newKey){
            keyHistory[activeTile].item = newKey;
            currentGuess[activeTile % (difficulty+2)] = newKey;
            //console.log(keyHistory)
            if(activeTile % (difficulty+2) == (difficulty+1)){
                setActiveTile(-1);
                setTip('Press Enter to submit.');

                setTrial(trial + 1);
                //console.log(currentGuess.length);             
            }else{
                setActiveTile(newKey? activeTile+1 : 0);
            }
            currentGuess[activeTile % (difficulty+2)] = newKey;
            setNewKey('');
        }
                
        //console.log(keyHistory)

        //setKeyHistory(enteredKeys)
        //console.log(guessedLetters[activeTile])
    }, [newKey])

    useEffect(() => {
        if (submitted) {
            for(let i:number=0; i<currentGuess.length; i++){
                if (currentGuess[i] == wordle[i]) {
                    keyHistory[(trial-1)*(difficulty+2) + i]?  keyHistory[(trial-1)*(difficulty+2)+ i].color = 'green': {};

                }else if (wordle.includes(currentGuess[i])) {
                    keyHistory[(trial-1)*(difficulty+2) + i]? keyHistory[(trial-1)*(difficulty+2) + i].color = 'orange': {};
                }else{
                    keyHistory[(trial-1)*(difficulty+2) + i]? keyHistory[(trial-1)*(difficulty+2) + i].color = 'grey': {};
                    keyStyle[currentGuess[i]] = 'grey';

                }
            }
            activeTile == -1? setActiveTile(trial*(difficulty+2) + activeTile+1): {};
            setSubmitted(false);
            if (currentGuess.join('') == wordle){
                setTip('Congratulations, You Won!');
                setActiveTile(-1)
            }else if (trial == (difficulty+3)){
                setTip(`Oops, you lost. Here I am: "${wordle}". Refresh Me to try again!`);
            }else{
                setTip('Tap key to find ME!')
            }            
        }

    }, [submitted])
     
    const values = {
        activeTile,
        setActiveTile,
        newKey,
        setNewKey,
        keyHistory,
        tip,
        setSubmitted,
        setWordle,
        keyStyle,
        difficulty,
        setDifficulty,
    }

    return <WordleContext.Provider value={values}>
        {children}
    </WordleContext.Provider>

}
export {WordleContext, WordleContextProvider};