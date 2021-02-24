import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';

function ComponentBox({ level, spacing, color,setDiscriptionToggle, discriptionToggle, position }) {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();
  const [boxPosition, setBoxPosition] = useState({ x: 5*spacing, y: 0, z: 10*level });
  // useFrame allows us to re-render/update rotation on each frame
  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));

  // Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.5, 1.5, 1.5] : [1, 1, 1],
  });

  return (
    <animated.mesh
      position={position}
      ref={mesh}
      scale={props.scale}
      onClick={() => {
        setExpand(!expand)
        setDiscriptionToggle(!discriptionToggle)
      }
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 0.2, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </animated.mesh>
  );
}

export default ComponentBox;
