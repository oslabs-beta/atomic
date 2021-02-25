import React, { useState, useMemo, Fragment } from 'react';
import * as THREE from 'three';

function EndPoint({ position }) {
  return <mesh position={position}></mesh>;
}

function Line({ defaultStart, defaultEnd }) {
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const vertices = useMemo(
    () => [start, end].map(v => new THREE.Vector3(...v)),
    [start, end]
  );

  return (
    <Fragment>
      <line>
        <geometry vertices={vertices} />
        <lineBasicMaterial
          color="white"
          linewidth={10}
          linecap={'round'}
          linejoin={'round'}
        />
      </line>
      <EndPoint position={start} />
      <EndPoint position={end} />
    </Fragment>
  );
}

export default Line;
