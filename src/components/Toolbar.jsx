// src/components/Toolbar.jsx
import React from 'react';
import './Toolbar.css';
import useMapStore from "../store/mapStore.js"; // Import the CSS file for styling

const Toolbar = () => {
    const { activeTool, setActiveTool } = useMapStore();
    const tools = ['Move', 'Paint', 'Select'];

    return (
        <div className="toolbar">
            {tools.map((tool) => (
                <button
                    key={tool}
                    className={`toolbar-button ${activeTool === tool.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setActiveTool(tool.toLowerCase())}
                >
                    {tool}
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
