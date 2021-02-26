import React from 'react';
import ComponentBox from './ComponentBox';
// import { componentAtomTreeMock } from '../../mock/mockComponentTree';

// let data = [
//   {
//     children: [
//       {
//         children: [],
//         parent: 'APP',
//         name: 'Level 1-A',
//         level: 1,
//         state: 'state',
//         atom: 'atoms',
//       },
//       {
//         children: [
//           {
//             children: [],
//             parent: 'Level 1-B',
//             name: 'Level 2-A',
//             level: 2,
//             state: 'state',
//             atom: 'atoms',
//           },
//         ],
//         parent: 'APP',
//         name: 'Level 1-B',
//         level: 1,
//         state: 'state',
//         atom: 'atoms',
//       },
//     ],
//     parent: null,
//     name: 'APP',
//     level: 0,
//     state: 'state',
//     atom: 'atoms',
//   },
// ];

function ComponentBoxes({ setDiscriptionToggle, discriptionToggle }) {
  // const treeArray = [];
  // let spacing = 0;
  // const traverseTree = data => {
  //   data.forEach(node => {
  //   //Check if there are children
  //   //if node.children.length > 0, recurse
  //   //else, push into tree array ComponentBox
  //     if(node.children)
  //   })

  // };

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
      <ComponentBox
        position={[-2, 0, -5]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[2, 0, -5]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[0, 0, -8]}
        color="red"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[0, 0, -2]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[4, 0, -2]}
        color="purple"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[-4, 0, -2]}
        color="purple"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[2, 0, 0]}
        color="purple"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[-2, 0, 0]}
        color="blue"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[-4, 0, 2]}
        color="purple"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
      <ComponentBox
        position={[0, 0, 2]}
        color="purple"
        setDiscriptionToggle={setDiscriptionToggle}
        discriptionToggle={discriptionToggle}
      />
    </>
  );
}

export default ComponentBoxes;
