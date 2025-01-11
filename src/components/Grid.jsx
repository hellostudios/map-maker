// src/components/Grid.jsx
import React from 'react';
import SquareGrid from "./Grid/SquareGrid.jsx";
import HexagonGrid from "./Grid/HexagonGrid.jsx";

const Grid = ({type = 'square', divisions = 10, gridLineColour = 'gray'}) => {
    if (type === 'square') {
        return (
            <SquareGrid divisions={divisions} lineColor={gridLineColour}/>
        );
    } else if (type === 'hexagon') {
        return (
            <HexagonGrid divisions={divisions} lineColor={gridLineColour}/>
        );
    } else {
        console.warn(`Grid type "${type}" is not supported.`);
        return null;
    }
};

export default Grid;
