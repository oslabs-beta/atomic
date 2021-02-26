import React from 'react';
import * as THREE from 'three';

function Line({
  defaultStart,
  defaultEnd,
}: {
  defaultStart: number[];
  defaultEnd: number[];
}): JSX.Element {
  // const [start, setStart] = useState(defaultStart);
  // const [end, setEnd] = useState(defaultEnd);
  const [startX, startY, startZ] = defaultStart;
  const [endX, endY, endZ] = defaultEnd;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(startX, startY, startZ),
    new THREE.Vector3(endX, endY, endZ),
  ]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 70, 0.04, 50, false]} />
      <meshStandardMaterial attach="material" color={'white'} />
    </mesh>
  );
}

export default Line;
