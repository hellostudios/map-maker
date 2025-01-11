import { useState } from 'react';
import GridPreview from './GridPreview';
import { saveMapToFirebase } from '../services/firebaseService';
import { useNavigate } from 'react-router-dom';

const NewMapForm = () => {
    const [name, setName] = useState(`Map-${Date.now()}`);
    const [gridType, setGridType] = useState('square');
    const [gridSize, setGridSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateMap = async () => {
        setLoading(true);
        const newMap = {
            gridType,
            gridSize,
            name
        };
        try {
            const mapRef = await saveMapToFirebase(newMap); // Save to Firebase
            const newMapId = mapRef.id; // Get the ID of the new map
            navigate(`/map/${newMapId}`); // Redirect to the new map's page
        } catch (error) {
            console.error('Error creating map:', error);
            alert('Failed to create map. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New Map</h2>
            <label>
                Map Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Grid Type:
                <select value={gridType} onChange={(e) => setGridType(e.target.value)}>
                    <option value="square">Square</option>
                    <option value="hexagon">Hexagon</option>
                </select>
            </label>
            <label>
                Grid Size:
                <input
                    type="number"
                    value={gridSize}
                    onChange={(e) => setGridSize(e.target.value)}
                    min="5"
                    max="50"
                />
            </label>
            <button onClick={handleCreateMap} disabled={loading}>
                {loading ? 'Creating...' : 'Create Map'}
            </button>
            <GridPreview gridType={gridType} gridSize={gridSize}/>
        </div>
    );
};

export default NewMapForm;
