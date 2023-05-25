import { CameraControls } from 'camera-controls';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

CameraControls.install({ THREE });
extend({ CameraControls });

export default function Controls() {
    const ref = useRef();
    const camera = useThree((state) => state.caemra);
    const gl = useThree((state) => state.gl);
    useFrame((state, delta) => {
        ref.current.azimuthAngle = -state.mouse.x;
        ref.current.polarAngle = Math.PI / 2 + state.mouse.y;
        ref.current.update(delta);
    });
    return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
};