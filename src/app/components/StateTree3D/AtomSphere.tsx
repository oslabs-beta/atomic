import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring/three';

const AtomSphere: React.FC = ({ position, color }) => {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();

  // Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <animated.mesh
      position={position}
      ref={mesh}
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      // castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[0.5, 50, 100]} />
      <meshStandardMaterial attach="material" color={color} />
    </animated.mesh>
  );
};

export default AtomSphere;
