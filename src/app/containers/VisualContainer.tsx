import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import StateTree3D from '../components/StateTree3D/StateTree3D';
import AtomNetwork from '../components/AtomNetwork/AtomNetwork';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import StateDiff from '../components/StateDiff/StateDiff';
import StateTree from '../components/StateTree/StateTree';

const VisualContainer: React.FC = () => {
  const [tab, setTab] = useState<string>('State Tree 3D');

  const navLists:any = {
    'State Diff': <StateDiff />,
    'State Tree': <StateTree />,
    'State Tree 3D': <StateTree3D />,
    'Component Tree': <ComponentTree />,
    'Atom Network': <AtomNetwork />,
  };

  const tabsList: string[] = Object.keys(navLists);

  return (
    <div className="visualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {navLists[tab]}
    </div>
  );
};

export default VisualContainer;
