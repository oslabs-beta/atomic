import React, { useCallback, useState } from 'react';
import Tree from "react-d3-tree";

const data = {
  children: [
    {
      children: [],
      name: 'Level 1-A',
      tag: 0,
      state: 1,
      atom: ["atom3"]
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-A',
          tag: 0,
          state: 2,
          atom: ["atom4"]
        },
        
      ],
      name: 'Level 1-B',
      tag: 0,
      state: 3,
      atom: ["atom2"]
    },
    
  ],
  name: 'APP',
  tag: 0,
  state: 4,
  atom: ["atom2", "atom1"]
};
const containerStyles = {
  height: "100vh",

};

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, []);
  return [translate, containerRef];
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.state && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        State: {nodeDatum.state}
      </text>
    )}
  </g>
);

function ComponentTree() {
  const [translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={data}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        style={{color:"white"}}
      />
    </div>
  );
}

export default ComponentTree;
