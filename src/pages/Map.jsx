import {Canvas} from '@react-three/fiber'
import {Environment, GizmoHelper, GizmoViewport, OrbitControls} from '@react-three/drei'

export default function Map() {
    return (
        <Canvas shadows camera={{ position: [20, 24, 24], fov: 50 }}>
            <OrbitControls
                makeDefault
                minPolarAngle={0.1 * Math.PI}
                maxPolarAngle={0.48 * Math.PI}
            />
            <Environment preset="city" />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>
        </Canvas>
    )
}
