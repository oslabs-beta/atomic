import React from 'react';
import ReactJson from 'react-json-view'
import {componentAtomTreeMock} from "../../mock/mockComponentTree"


function StateTree() {
  return (
    <div className="stateTree">
      {componentAtomTreeMock && (
        <ReactJson src={componentAtomTreeMock} theme="monokai" />
      )}
    </div>
  );
}

export default StateTree;
