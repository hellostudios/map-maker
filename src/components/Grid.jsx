// src/components/Grid.jsx
import React from 'react';
import * as THREE from 'three';

const Grid = ({ type = 'square', size = 10, divisions = 10, color1 = 'gray', color2 = 'gray' }) => {
    if (type === 'square') {
        return <gridHelper args={[size, divisions, color1, color2]} />;
    } else if (type === 'hexagon') {
        // Custom hexagon grid implementation
        const lines = [];
        const hexSize = size / divisions;
        const height = Math.sqrt(3) * hexSize;
        const halfHeight = height / 2;

        const hexDivisions= Math.floor(divisions / 2);

        for (let row = -hexDivisions; row < hexDivisions; row++) {
            for (let col = -hexDivisions; col < hexDivisions; col++) {
                const x = col * 1.5 * hexSize;
                const y = row * height + (Math.abs(col % 2) * halfHeight);

                // Create hexagon lines
                const hexPoints = [];
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    hexPoints.push(new THREE.Vector3(x + hexSize * Math.cos(angle), 0, y + hexSize * Math.sin(angle)));
                }
                hexPoints.push(hexPoints[0]);

                for (let i = 0; i < 6; i++) {
                    lines.push(hexPoints[i], hexPoints[i + 1]);
                }
            }
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(lines);

        return (
            <lineSegments geometry={geometry}>
                <lineBasicMaterial color={color1} />
            </lineSegments>
        );
    } else {
        console.warn(`Grid type "${type}" is not supported.`);
        return null;
    }
};

export default Grid;
