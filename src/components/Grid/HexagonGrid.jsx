// src/components/Grid/HexagonGrid.jsx
import React from 'react';
import * as THREE from 'three';
import GridCell from "./GirdCell.jsx";

const HexagonGrid = ({ divisions = 10, cellColor = 'white', lineColor = 'gray' }) => {
    const size = 10;
    const meshes = [];
    const lines = [];
    const hexSize = size / divisions;
    const height = Math.sqrt(3) * hexSize;
    const halfHeight = height / 2;

    const hexDivisions = Math.floor(divisions / 2);

    for (let row = -hexDivisions; row < hexDivisions; row++) {
        for (let col = -hexDivisions; col < hexDivisions; col++) {
            const x = col * 1.5 * hexSize;
            const z = row * height + (Math.abs(col % 2) * halfHeight);

            //render a HexagonMesh
            const plane = (
                <GridCell key={`cell-${row}-${col}`} sides={6} size={hexSize} position={[x, 0, z]} cellColor={cellColor} rotation={[-Math.PI / 2, 0, 0]}/>
            );
            meshes.push(plane);

            const hexPoints = [];
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                hexPoints.push(
                    new THREE.Vector3(
                        x + hexSize * Math.cos(angle),
                        0.01,
                        z + hexSize * Math.sin(angle)
                    )
                );
            }
            hexPoints.push(hexPoints[0]);
            for (let i = 0; i < 6; i++) {
                lines.push(hexPoints[i], hexPoints[i + 1]);
            }
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

export default HexagonGrid;
