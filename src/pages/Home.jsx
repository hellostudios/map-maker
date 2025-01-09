// Updated HomePage component with the map list displayed by default
import {useState} from 'react';
import NewMapForm from '../components/NewMapForm';
import MapSelector from '../components/MapSelector.jsx';

const HomePage = () => {
    const [showNewMapForm, setShowNewMapForm] = useState(false);
    return (
        <div>
            <h1>Map Maker</h1>
            <div>
                <button onClick={() => setShowNewMapForm(true)}>Create New Map</button>
            </div>
            {showNewMapForm ? (
                <NewMapForm />
            ) : (
                <MapSelector />
            )}
        </div>
    );
};

export default HomePage;