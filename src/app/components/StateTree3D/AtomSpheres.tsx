import React, { ReactNode } from 'react';
import AtomSphere from './AtomSphere';

function AtomSpheres(): ReactNode {
  return <AtomSphere position={[0, 4, -4]} color="gray" />;
}

export default AtomSpheres;
