import { useEffect, useState } from "react";
import { Cell } from "./Cell";

export function Grid({ sizeX = 10, sizeY = 10}){
    const [cells, setCells] = useState<boolean[][]>(init(sizeX, sizeY));

    useEffect(() => {
        setTimeout(() => {
            let newState = tick(cells);
            setCells(newState);
        }, 5000);
    }, [cells]);

    let rows:any[] = [];
    for(let y = 0; y < sizeY; y++){
        let cellsInRow:any[] = [];
        for(let x = 0; x < sizeX; x++){
            cellsInRow.push(<Cell key={y+"-"+x} habited={  cells[y] != null ? cells[y][x] : false }/>);
        }
        rows.push(<tr key={y}>{cellsInRow}</tr>);
    }

    return (<table className="w-full"><tbody>{rows}</tbody></table>);
}

function init(sizeX:number, sizeY:number):boolean[][]{
    let cellsState:boolean[][] = [];
    for(let y = 0; y < sizeY; y++){
        let row:boolean[] = [];
        for(let x = 0; x < sizeX; x++){
            row.push(Math.random() > 0.75);
        }
        cellsState.push(row);

    }
    return cellsState;
}

function tick(cells: boolean[][]){
    console.log("Tick!" + new Date().toISOString());
    console.log(cells);
    for(let y = 0; y < cells.length; y++){
        for(let x = 0; x < cells[0].length; x++){
            computeCellState(cells, x, y);
        }
    }
    return [...cells];
}

/*
    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
function computeCellState(cells:boolean[][], x:number, y:number){
    let neighbours:boolean[] = [];
    neighbours[0] = cells[y-1]?.[x-1] ?? false;
    neighbours[1] = cells[y-1]?.[x] ?? false;
    neighbours[2] = cells[y-1]?.[x+1] ?? false;
    neighbours[3] = cells[y]?.[x-1] ?? false;
    neighbours[4] = cells[y]?.[x+1] ?? false;
    neighbours[5] = cells[y+1]?.[x-1] ?? false;
    neighbours[6] = cells[y+1]?.[x] ?? false;
    neighbours[7] = cells[y+1]?.[x+1] ?? false;

    let numberOfNeighbours = neighbours.filter(n => n).length;

    if(numberOfNeighbours < 2 || numberOfNeighbours > 3){
        cells[y][x] = false;
    } else if(numberOfNeighbours === 3){
        cells[y][x] = true;
    }
}