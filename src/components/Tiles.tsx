import type {ComponentType} from 'react';
import {useContext} from 'react';
import {WordleContext} from '../context/WordleContext';

interface SizeProps {
    rows: number;
    columns: number;
    items: any;
}
interface PuzzleProps {
    trials: number;
}

interface RowProps<T> {
    loc: number;
    size: number;
    items: T[];
    Component: ComponentType<T>;
}

interface TileProps {
    id: number;
    item: string;
}

function Puzzle() {
    const {difficulty} = useContext(WordleContext);
    const tiles: any [] = Array(difficulty+3).fill(null);
    return(
    <div>
        {
            tiles.map((_, index) => {
                const rowItems: TileProps[] = Array(difficulty+2).fill({item: ''})
                return <Row key={index} loc={index} size={rowItems.length} items={rowItems} Component={Tile}></Row>
            })
        }
    </div>
    );
}

function Row<T>({loc, size, items, Component}: RowProps<T>) {
    return <div>
        {
            items.map((item, index) => {
                return <Component key={`tile${loc*size+index}`}  id={loc*size+index} {...item}></Component>
            })
        }
    </div>
}

function Tile({id, item} : TileProps) {
    const {activeTile, keyHistory} = useContext(WordleContext)
    return <span className={`tile ${keyHistory[id].color} ${id===activeTile && "active"}`}>{keyHistory[id].item}</span>
}
export {Puzzle, Tile, Row};