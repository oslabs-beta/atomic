import React from 'react';
import ComponentBox from './ComponentBox';

function ComponentBoxes({ setDiscriptionToggle, discriptionToggle }) {
  return (
    <>
      <ComponentBox
        position={[0, 0, -8]}
        color="red"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[-2, 0, -6]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[2, 0, -6]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
    </>
  );
}

export default ComponentBoxes;
