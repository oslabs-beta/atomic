import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import StateTree from '../components/StateTree3D/StateTree';
import AtomNetwork from '../components/AtomNetwork/AtomNetwork';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import StateDiff from '../components/StateDiff/StateDiff';

function VisualContainer() {
  const [tab, setTab] = useState<string>('State Tree 3D');

  const navLists = {
    'State Tree 3D': <StateTree />,
    'Atom Network': <AtomNetwork />,
    'Component Tree': <ComponentTree />,
    'State Diff': <StateDiff />,
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
