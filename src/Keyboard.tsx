import { useContext } from 'react';
import {Row, Tile} from './Tiles';
import {WordleContext} from './WordleContext'
import { Action } from 'rxjs/internal/scheduler/Action';
const KEY_STRINGS: string[] = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const CTRL_KEYS: string[] = ["Back", "Enter"];

interface KeyboardProps {
    label: string;
    color: string;
    onClick: () => void;
}
function KeyboardButton({label, onClick} : KeyboardProps){
    const {keyStyle} = useContext(WordleContext);
    return <button className={`button ${keyStyle[label]}`} onClick={onClick}>{label}</button>;
}
function Keyboard() {
    const {activeTile, setActiveTile, setNewKey, setSubmitted, keyStyle} = useContext(WordleContext)

    const handleClick = (KEY: string) => {
        //e.PreventDefault
        //document.getElementById("activeTile").innerHTML = 'K'
        setNewKey(KEY);
        //setActiveTile(`tile${9}`)

    }
    const submitTrial = () => {
        setSubmitted(true);
    }

    const clear = ()=> {
        activeTile % 5? setActiveTile(activeTile-1): {}
    }
    return (
        <div>
            {
                KEY_STRINGS.map((KEY_STRING, index) => {
                    const rowItems: KeyboardProps[] = KEY_STRING.split("").map((KEY) => ({
                        label: KEY,
                        onClick: () => handleClick(KEY),
                    }))
                    return <Row key={KEY_STRING} loc={index} size={KEY_STRING.length} items={rowItems} Component={KeyboardButton}></Row>
                })
            }
            <Row key="CTRL" loc={-1} size={2} items={CTRL_KEYS.map((KEY) => ({label:KEY, onClick: KEY == "Back"? clear: submitTrial,}))} Component={KeyboardButton}></Row>
        </div>
    );
}
 export default Keyboard;