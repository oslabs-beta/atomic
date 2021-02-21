import React, { useState } from 'react';
import ComponentBox from './ComponentBox';
import { componentAtomTreeMock } from '../mock/mockComponentTree';

let data = {
  children: [
    {
      children: [],
      name: 'Level 1-A',
      tag: 0,
      state: 'state',
      atom: 'atoms',
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-A',
          tag: 0,
          state: 'state',
          atom: 'atoms',
        },
      ],
      name: 'Level 1-B',
      tag: 0,
      state: 'state',
      atom: 'atoms',
    },
  ],
  name: 'APP',
  tag: 0,
  state: 'state',
  atom: 'atoms',
};
console.log(data);

function ComponentBoxes({ setDiscriptionToggle, discriptionToggle }) {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0, z: 0 });
  return (
    <>
      {[1,2,3,4].map((item, idx) => (
        <ComponentBox
          key={idx}
          position={[idx * 3, boxPosition.y, boxPosition.z]}
          color="#328ba8"
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
