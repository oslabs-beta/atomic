import React, { useCallback, useState } from 'react';
import Tree from "react-d3-tree";

const data = {
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
          atom: ["atom1"],
          state: 0
        },
        {
          children: [
            {
              children: [],
              name: 'Level 3-A',
              tag: 0,
              atom: ["atom1"],
              state: 0
            },
            {
              children: [
                {
                  children: [],
                  name: 'Level 4-A',
                  tag: 0,
                  atom: ["atom1"],
                  state: 0
                },
              ],
              name: 'Level 3-B',
              tag: 0,
              atom: ["atom1"],
              state: 0
            },
          ],
          name: 'Level 2-B',
          tag: 0,
          atom: ["atom1"],
          state: 0
        },
      ],
      name: 'Level 1-B',
      tag: 0,
      atom: ["atom1"],
      state: 6
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-C',
          tag: 0,
          atom: ["atom1"],
          state: 0
        },
        {
          children: [],
          name: 'Level 2-D',
          tag: 0,
          atom: ["atom1"],
          state: 5
        },
      ],
      name: 'Level 1-C',
      tag: 0,
      atom: ["atom1"],
      state: 0
    },
  ],
  name: 'APP',
  tag: 0,
  atom: ["atom1"],
  state: 1
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
    <rect width="20" height="20" x="-10" fill="#1cb5c9" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.state && (
      <text fill="black" x="20" dy="15" strokeWidth="1">
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

      />
    </div>
  );
}

export default ComponentTree;
