import React, { useState, useMemo, Fragment } from 'react';
import * as THREE from 'three';



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
          linewidth={1}
          linecap={'round'}
          linejoin={'round'}
        />
      </line>
       <mesh position={start}></mesh>;
       <mesh position={end}></mesh>;
    </Fragment>
  );
}

export default Line;
