import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import useStore from './useStore'; // Import Zustand store

// import * as dat from 'dat.gui'; // Import Dat.GUI

const Grid = ({ gridSize }) => {
    const activeMode = useStore((state) => state.activeMode)

    // useEffect(() => {
    //     // Initialize Dat.GUI
    //     const gui = new dat.GUI();
    //     // Create a controller for the mode
    //     const modeController = {
    //         mode: activeMode,
    //     };
    //     gui.add(modeController, 'mode', ['move', 'paint', 'select', 'remove']).onChange((newMode) => {
    //         setActiveMode(newMode);
    //     });
    //     // Clean up the GUI when the component unmounts
    //     return () => {
    //         gui.destroy();
    //     };
    // }, [activeMode, setActiveMode]); // Re-run the effect when activeMode changes


    const [blocks, setBlocks] = useState(new Set());
    const [selectedBlocks, setSelectedBlocks] = useState(new Set());
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && activeMode === 'select') {
                // Remove selected blocks in Select Mode
                setBlocks((prev) => {
                    const newBlocks = new Set(prev);
                    selectedBlocks.forEach((key) => newBlocks.delete(key));
                    return newBlocks;
                });
                setSelectedBlocks(new Set());
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedBlocks, activeMode]);

    useEffect(() => {
        if(activeMode !== 'select') {
            setSelectedBlocks(new Set());
        }
    }, [setSelectedBlocks, activeMode]);


    const handlePointerDown = (event, row, col) => {
        event.stopPropagation();
        if (event.button !== 0) return; // Only proceed if the left mouse button is clicked

        const key = `${row},${col}`;
        setIsDragging(true);

        if (activeMode === 'paint') {
            setBlocks((prev) => new Set(prev).add(key));
        } else if (activeMode === 'remove') {
            setBlocks((prev) => {
                const newBlocks = new Set(prev);
                newBlocks.delete(key);
                return newBlocks;
            });
        } else if (activeMode === 'select') {
            setSelectedBlocks((prev) => {
                const newSelection = new Set(prev);
                if(blocks.has(key)) { // make sure that there is a block before trying to select it
                    if (newSelection.has(key)) {
                        newSelection.delete(key); // Unselect if already selected
                    } else {
                        newSelection.add(key); // Select if not selected
                    }
                }
                return newSelection;
            });
        }
    };

    const handlePointerMove = (event, row, col) => {
        event.stopPropagation();
        //if (event.button !== 0) return; // Only proceed if the left mouse button is clicked

        if (!isDragging) return;

        const key = `${row},${col}`;
        if (activeMode === 'paint') {
            setBlocks((prev) => new Set(prev).add(key));
        } else if (activeMode === 'remove') {
            setBlocks((prev) => {
                const newBlocks = new Set(prev);
                newBlocks.delete(key);
                return newBlocks;
            });
        }
    };

    const handlePointerUp = () => setIsDragging(false);

    const renderGrid = () => {
        const cells = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const key = `${row},${col}`;
                cells.push(
                    <Cell
                        key={key}
                        row={row}
                        col={col}
                        isBlock={blocks.has(key)}
                        isSelected={selectedBlocks.has(key)}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                    />
                );
            }
        }
        return cells;
    };

    return <group>{renderGrid()}</group>;
};

export default Grid;
