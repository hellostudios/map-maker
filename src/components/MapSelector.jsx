import { useEffect, useState } from 'react';
import {getMapsFromFirebase} from '../services/firebaseService';
import {useNavigate} from "react-router-dom";

const MapSelector = () => {
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMaps = async () => {
        setLoading(true);
        try {
            const fetchedMaps = await getMapsFromFirebase();
            setMaps(fetchedMaps);
        } catch (error) {
            setMaps([]);
            console.error(error);
        }
        setLoading(false);
    };

    const handleMapLoad = async (mapId) => {
        navigate(`/map/${mapId}`); // Redirect to the new map's page
    };

    useEffect(() => {
        fetchMaps();
    }, []);

    return (
        <div>
            <h2>Select an Existing Map</h2>
            {loading ? (
                <p>Loading maps...</p>
            ) : (
                <ul>
                    {maps.map((map) => (
                        <li key={map.id}>
                            {map.name} - Grid: {map.gridType}, Size: {map.gridSize}
                            <button onClick={() => handleMapLoad(map.id)}>Load</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MapSelector;
