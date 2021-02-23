import React, { Children, useState } from 'react';
import ComponentBox from './ComponentBox';
import { componentAtomTreeMock } from '../../mock/mockComponentTree';

let data = [{
  children: [
    {
      children: [],
      parent: 'APP',
      name: 'Level 1-A',
      level: 1,
      state: 'state',
      atom: 'atoms',
    },
    {
      children: [
        {
          children: [],
          parent: 'Level 1-B',
          name: 'Level 2-A',
          level: 2,
          state: 'state',
          atom: 'atoms',
        },
      ],
      parent: 'APP',
      name: 'Level 1-B',
      level: 1,
      state: 'state',
      atom: 'atoms',
    },
  ],
  parent: null,
  name: 'APP',
  level: 0,
  state: 'state',
  atom: 'atoms',
}];

function ComponentBoxes({ setDiscriptionToggle, discriptionToggle }) {
  const treeArray = [];

  const traverseTree = data => {
    let level = 0;
    let spacing = 0;

    data.forEach(node => {
      if(node.children)
    })
    
  };

  return (
    <>
      {/* {treeArray.map((item, idx) => (
        <ComponentBox
          key={idx}
          color="#328ba8"
          setDiscriptionToggle={setDiscriptionToggle}
          discriptionToggle={discriptionToggle}
        />
      ))}  */}
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
