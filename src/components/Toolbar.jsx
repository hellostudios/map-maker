// src/components/Toolbar.jsx
import React from 'react';
import './Toolbar.css'; // Import the CSS file for styling

const Toolbar = ({ onToolSelect }) => {
    const tools = ['Move', 'Paint', 'Select'];

    return (
        <div className="toolbar">
            {tools.map((tool) => (
                <button
                    key={tool}
                    className="toolbar-button"
                    onClick={() => onToolSelect(tool.toLowerCase())}
                >
                    {tool}
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
