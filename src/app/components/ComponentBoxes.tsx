import React from 'react';
import ComponentBox from './ComponentBox';

function ComponentBoxes() {
  return (
    <>
      <ComponentBox position={[0, 0, -8]} color="red" />
      <ComponentBox position={[-2, 0, -6]} color="blue" />
      <ComponentBox position={[2, 0, -6]} color="blue" />
    </>
  );
}

export default ComponentBoxes;
