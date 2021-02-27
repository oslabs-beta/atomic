import React from 'react';
import AtomSphere from './AtomSphere';

function AtomSpheres(): JSX.Element {
  return (
    <>
      <AtomSphere position={[0, 4, -4]} color="gray" />
      <AtomSphere position={[2, 4, -2]} color="gray" />
    </>
  );
}

export default AtomSpheres;
