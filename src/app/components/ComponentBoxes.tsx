import React from 'react';
import ComponentBox from './ComponentBox';

function ComponentBoxes() {
  return (
    <>
      <ComponentBox position={[2, 0, -6]} color="red" />
      <ComponentBox position={[-2, 0, -6]} color="blue" />
    </>
  );
}

export default ComponentBoxes;
