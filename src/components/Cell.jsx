import React, { useMemo, useState} from 'react';
import useStore from "./useStore.js";

const Cell = ({ row, col, isBlock, isSelected, onPointerDown, onPointerMove, onPointerUp }) => {

    const activeMode = useStore((state) => state.activeMode)
    const [hover, setHover] = useState(false);


    const onPointerEnter = (e) => {
        e.stopPropagation();
        if(activeMode === 'move') {
            setHover(false);
        }
        setHover(true);
    };

    const onPointerLeave = (e) => {
        e.stopPropagation();
        if(activeMode === 'move') {
            setHover(false);
        }
        setHover(false);
    };

    const color = useMemo(() => {
        if(hover) {
            switch (activeMode) {
                case 'paint':
                    return 'green'; // Highlight green for paint mode
                case 'remove':
                    return 'red'; // Red for remove mode
                case 'select':
                    return 'orange'; // orange for select mode
                default:
                    return isBlock ? 'lightgray' : 'white';
            }
        }
        if(isSelected) {
            return 'orange'
        }
        return isBlock ? 'lightgray' : 'white';
    }, [hover, activeMode, isBlock, isSelected]);

    return (
        <mesh
            position={[row, 0, col]}
            onPointerDown={(e) => {
                onPointerDown(e, row, col);
            }}
            onPointerMove={(e) => {
                onPointerMove(e, row, col);
            }}
            onPointerUp={onPointerUp}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            <boxGeometry args={[1, 0.1, 1]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={isBlock ? 1 : 0.3}
            />
        </mesh>
    );
};

export default Cell;
