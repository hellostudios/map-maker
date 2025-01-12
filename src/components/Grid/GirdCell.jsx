// src/components/Grid/GridCell.jsx
import React, {useEffect, useState} from 'react';
import * as THREE from 'three';
import useMapStore from "../../store/mapStore.js";

const GridCell = ({ size, sides = 4, position, rotation, cellColor = 'white'}) => {
    const { activeTool } = useMapStore();
    const [hover, setHover] = useState(false);

    const handleHover = (e) => {
        e.stopPropagation();
        if (activeTool === 'move') return;
        setHover(true);
    }

    useEffect(() => {
        if (activeTool === 'move') {
            setHover(false);
        };
    }, [activeTool]);

    return (
        <mesh
            onPointerOver={handleHover}
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
