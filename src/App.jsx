import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';
import useStore from './components/useStore'; // Update the import path
import './App.css';

const App = () => {
    const activeMode = useStore((state) => state.activeMode)


    return (
        <div className="app" style={{ display: 'flex' }}>
            <Canvas camera={{ position: [10, 20, 10], fov: 50 }}  style={{flex: 1, backgroundColor: 'darkgray'}}>
                {activeMode === 'move' && <OrbitControls />}
                <ambientLight intensity={0.5}/>
                <pointLight position={[10, 10, 10]}/>
                <Grid gridSize={20}/>
            </Canvas>
            <Toolbar/>
        </div>
    );
};

export default App;
