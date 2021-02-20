import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

function ComponentBox() {
  //ref to target the mesh
  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      position={[0, 1, 0]}
      ref={mesh}
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[3, 2, 1]} />
      <meshStandardMaterial attach="material" color="purple" />
    </a.mesh>
  );
}

export default ComponentBox;
