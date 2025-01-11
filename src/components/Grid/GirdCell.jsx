// src/components/Grid/GridCell.jsx
import React, { useState } from 'react';
import * as THREE from 'three';

const GridCell = ({ size, sides = 4, position, rotation, cellColor = 'white'}) => {
    const [hover, setHover] = useState(false);
    return (
        <mesh
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
            position={position}
            rotation={rotation}
        >
            {sides === 6 && <circleGeometry args={[size, 6]}/>}
            {sides === 4 && <planeGeometry args={[size, size]}/>}
            <meshBasicMaterial color={cellColor} transparent opacity={hover ? 0.5 : 0} side={THREE.DoubleSide}/>
        </mesh>
    )
}

export default GridCell;
