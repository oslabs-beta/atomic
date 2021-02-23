import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import StateTree3D from '../components/StateTree3D/StateTree';
import AtomNetwork from '../components/AtomNetwork/AtomNetwork';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import StateDiff from '../components/StateDiff/StateDiff';
import StateTree from "../components/StateTree/StateTree"
import CodeJSONTree from "../components/StateTree/code"

function VisualContainer() {
  const [tab, setTab] = useState<string>('State Tree');

  const navLists = {
    'State Tree 3D': <StateTree3D />,
    'Atom Network': <AtomNetwork />,
    'Component Tree': <ComponentTree />,
    "State Tree": <StateTree/>
    'State Diff': <CodeJSONTree />,
  };

  const tabsList: string[] = Object.keys(navLists);

  return (
    <div className="visualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {navLists[tab]}
    </div>
  );
}

export default VisualContainer;
