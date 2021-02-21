import React, { useState } from 'react';
import ComponentBox from './ComponentBox';
import { componentAtomTreeMock } from '../mock/mockComponentTree';

let data = {
  children: [
    {
      children: [],
      name: 'Level 1-A',
      tag: 0,
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-A',
          tag: 0,
        },
      ],
      name: 'Level 1-B',
      tag: 0,
    },
  ],
  name: 'APP',
  tag: 0,
};
console.log(data);

function ComponentBoxes({ setDiscriptionToggle, discriptionToggle }) {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <>
      {[1, 2].map((item,idx)=> (
        <ComponentBox
        key={idx}
          position={[boxPosition.x, boxPosition.y, boxPosition.z]}
          color="red"
          setDiscriptionToggle={setDiscriptionToggle}
          discriptionToggle={discriptionToggle}
        />
      ))}
      {/* <ComponentBox
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
      /> */}
    </>
  );
}

export default ComponentBoxes;
