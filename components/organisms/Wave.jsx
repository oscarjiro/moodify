import { useFrame } from '@react-three/fiber';
import { createNoise3D } from "simplex-noise";
import { Vector2 } from 'three';
import { useRef } from 'react';

const noise3D = createNoise3D();

export default function Wave({ color, segments }) {
    const mesh = useRef(null);
    const geometry = useRef(null);
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta * 0.2;
        const g = geometry.current;
        const v2 = new Vector2();

        for (let i = 0; i < g.attributes.position.count; i++) {
            const uvAttr = g.getAttribute("uv");
            v2.fromBufferAttribute(uvAttr, i)
            .addScalar(timeRef.current * 0.01)
            .multiplyScalar(20);  

            const h = noise3D(v2.x, v2.y, timeRef.current);
            g.attributes.position.setZ(i, h);
        }
        g.computeVertexNormals();
        g.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            <mesh ref={mesh} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -4, 0]}>
                <planeGeometry ref={geometry} args={[100, 100, segments, segments]} />
                <meshStandardMaterial wireframe color={color} />
            </mesh>
        </group>
    );
};