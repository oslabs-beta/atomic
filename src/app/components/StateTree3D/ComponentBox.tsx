import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring/three';

function ComponentBox({
  level,
  spacing,
  color,
  setDiscriptionToggle,
  discriptionToggle,
  position,
}: {
  level?: number;
  spacing?: number;
  color: string;
  setDiscriptionToggle: React.Dispatch<React.SetStateAction<boolean>>;
  discriptionToggle: React.Dispatch<React.SetStateAction<boolean>>;
  position: number[];
}): JSX.Element {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();
  // const [boxPosition, setBoxPosition] = useState({
  //   x: 5 * spacing,
  //   y: 0,
  //   z: 10 * level,
  // });

  // Basic expand state
  const [expand, setExpand] = useState<boolean>(false);
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
        setExpand(!expand);
        setDiscriptionToggle(!discriptionToggle);
      }}
    >
      <boxBufferGeometry attach="geometry" args={[1, 0.2, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </animated.mesh>
  );
}

export default ComponentBox;
