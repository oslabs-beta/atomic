import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import AtomSpheres from './AtomSpheres';
import ComponentBoxes from './ComponentBoxes';
import Lines from './Lines';

const StateTree3D: React.FC = () => {
  const [discriptionToggle, setDiscriptionToggle] = useState(false);

  return (
    <>
      {/* Our Scene & Camera is already built into our canvas */}
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 20, 5], fov: 50 }}
        style={{ height: '80vh', width: '85vh', border: '1px solid black' }}
      >
        {/* This light makes things look pretty */}
        <ambientLight intensity={0.3} />
        {/* Our main source of light, also casting our shadow */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* A light to help illumnate the spinning boxes */}
        {/* <pointLight position={[0, -10, 0]} intensity={1.5} /> 
        <pointLight position={[10, 1, 100]} /> */}

        <group>
          {/* This mesh is the plane (The floor) */}
          {/* <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
              >
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
                <shadowMaterial attach="material" opacity={0.1} />
                <meshStandardMaterial attach="material" color="#202020" />
              </mesh> */}

          {/* ATOMS: */}
          <AtomSpheres />

          {/* COMPONENTS: */}
          <ComponentBoxes
            setDiscriptionToggle={setDiscriptionToggle}
            discriptionToggle={discriptionToggle}
          />
          <Lines />
        </group>
        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
      {discriptionToggle && (
        <div>
          <p>
            State: <br />
            Atoms:
          </p>
        </div>
      )}
    </>
  );
};

export default StateTree3D;
