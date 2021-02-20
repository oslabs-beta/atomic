import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';

function ComponentBox() {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();

  // useFrame allows us to re-render/update rotation on each frame
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));

  // Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <animated.mesh
      position={[-2, -2, -5]}
      ref={mesh}
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, .1]} />
      <meshStandardMaterial attach="material" color="purple" />
    </animated.mesh>
  );
}

export default ComponentBox;
