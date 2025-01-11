import React from 'react';
import * as THREE from 'three';
import GridCell from "./GirdCell.jsx";

const SquareGrid = ({ divisions = 10, cellColor = 'white', lineColor = 'gray' }) => {
    const size = 20;
    const cellSize = size / divisions;
    const halfSize = size / 2;

    const meshes = [];
    const lines = [];

    // Generate grid cells and lines
    for (let row = 0; row < divisions; row++) {
        for (let col = 0; col < divisions; col++) {
            const x = col * cellSize - halfSize + cellSize / 2;
            const z = row * cellSize - halfSize + cellSize / 2;
            const plane = (
                <GridCell key={`cell-${row}-${col}`} sides={4} size={cellSize} position={[x, 0, z]} cellColor={cellColor} rotation={[-Math.PI / 2, 0, 0]}/>
            );
            meshes.push(plane);

            // Add grid lines for the cell
            const topLeft = new THREE.Vector3(x - cellSize / 2, 0.01, z - cellSize / 2);
            const topRight = new THREE.Vector3(x + cellSize / 2, 0.01, z - cellSize / 2);
            const bottomLeft = new THREE.Vector3(x - cellSize / 2, 0.01, z + cellSize / 2);
            const bottomRight = new THREE.Vector3(x + cellSize / 2, 0.01, z + cellSize / 2);

            lines.push(topLeft, topRight); // Top edge
            lines.push(topRight, bottomRight); // Right edge
            lines.push(bottomRight, bottomLeft); // Bottom edge
            lines.push(bottomLeft, topLeft); // Left edge
        }
    }

    // Create geometry for grid lines
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(lines);

    return (
        <>
            {/* Render grid lines */}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial color={lineColor} />
            </lineSegments>
            {/* Render all square meshes */}
            {meshes}

        </>
    );
};

export default SquareGrid;
