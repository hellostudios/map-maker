import {useEffect, useState} from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, GizmoHelper, GizmoViewport, OrbitControls} from '@react-three/drei'
import {useNavigate, useParams} from "react-router-dom";
import {loadMapFromFirebase} from "../services/firebaseService.js";

const Map = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleHome = (event) => {
        event.stopPropagation();
        navigate('/');
    }

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
            <Canvas shadows camera={{position: [20, 24, 24], fov: 50}}>
                <OrbitControls
                    makeDefault
                    minPolarAngle={0.1 * Math.PI}
                    maxPolarAngle={0.48 * Math.PI}
                />
                <Environment preset="city"/>
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white"/>
                </GizmoHelper>
            </Canvas>
            <div>
                <button onClick={handleHome}>Home</button>
            </div>
        </>
    )
}

export default Map;