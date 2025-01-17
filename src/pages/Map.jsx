import {useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, GizmoHelper, GizmoViewport, OrbitControls} from '@react-three/drei'
import {useParams} from "react-router-dom";
import {loadMapFromFirebase} from "../services/firebaseService.js";
import Nav from "../components/Nav.jsx";
import Grid from "../components/Grid.jsx";
import Toolbar from "../components/Toolbar.jsx";
import useMapStore from "../store/mapStore.js";

const Map = () => {
    const {id} = useParams();
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { activeTool } = useMapStore();

    // Dynamically set the cursor style
    const getCursorStyle = () => {
        if (activeTool === 'move') {
            return 'grab'; // Cursor for move tool
        }
        // Default cursor for other tools
        return 'default';
    };

    const fetchMap = async (id) => {
        const mapDoc = await loadMapFromFirebase(id)
        if (mapDoc.exists()) {
            setMapData(mapDoc.data());
        } else {
            console.error('Map not found');
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchMap(id);
    }, [id]);

    if (loading) {
        return <p>Loading map...</p>;
    }

    if (!mapData) {
        return <p>Map not found</p>;
    }


    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            cursor: getCursorStyle()
        }}>
            <Nav name={mapData.name}/>
            <Canvas shadows camera={{position: [24, 24, 0], fov: 50}}>
                { activeTool === 'move' && <OrbitControls
                    makeDefault
                    minPolarAngle={0.1 * Math.PI}
                    maxPolarAngle={0.48 * Math.PI}
                /> }
                <Environment preset="city"/>
                { activeTool === 'move' && <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white"/>
                </GizmoHelper> }
                <Grid type={mapData.gridType} divisions={mapData.gridSize} gridLineColour="gray"/>
            </Canvas>
            <Toolbar />
        </div>
    )
}

export default Map;