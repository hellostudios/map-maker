import { useEffect, useState } from 'react';
import { getMapsFromFirebase } from '../services/firebaseService';

const MapSelector = () => {

    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);

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
                            <button onClick={() => console.log('Load map:', map)}>Load</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MapSelector;
