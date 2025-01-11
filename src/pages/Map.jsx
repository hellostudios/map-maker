import {useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, GizmoHelper, GizmoViewport, OrbitControls} from '@react-three/drei'
import {useParams} from "react-router-dom";
import {loadMapFromFirebase} from "../services/firebaseService.js";
import Nav from "../components/Nav.jsx";
import Grid from "../components/Grid.jsx";

const Map = () => {
    const {id} = useParams();
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <>
            <Nav name={mapData.name}/>
            <Canvas shadows camera={{position: [24, 24, 0], fov: 50}}>
                <OrbitControls
                    makeDefault
                    minPolarAngle={0.1 * Math.PI}
                    maxPolarAngle={0.48 * Math.PI}
                />
                <Environment preset="city"/>
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white"/>
                </GizmoHelper>

                <Grid type={mapData.gridType} size={10} divisions={mapData.gridSize} color1="gray" color2="gray" />


            </Canvas>

        </>
    )
}

export default Map;