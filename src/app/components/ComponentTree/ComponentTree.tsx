import React, { useCallback, useState } from 'react';
import Tree from "react-d3-tree";
import {componentAtomTreeMock} from "./mockComponentTree"


const containerStyles = {
  height: "100vh",

};

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 7 });
    }
  }, []);
  return [translate, containerRef];
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" x="-10" fill="#1cb5c9" onClick={toggleNode} />
    <text fill="white" strokeWidth="0.1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.state && (
      <text fill="#e0bf63" x="20" dy="15" strokeWidth="0.1" fontSize="10px">
        State: {`${nodeDatum.state}`}
      </text>
    )}
    <line  stroke="white"></line>
  </g>
);

function ComponentTree() {
  const [translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={componentAtomTreeMock}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        styles={}
      />
    </div>
  );
}

export default ComponentTree;
