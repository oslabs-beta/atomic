import React, { useState } from 'react';
import { ParentSize } from '@visx/responsive';
import NavBar from '../components/NavBar/NavBar';
import AtomNetwork from '../components/AtomNetwork/AtomNetwork';
import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';

interface navType {
  [tabName: string]: JSX.Element;
}

function VisualContainer(): JSX.Element {
  const [tab, setTab] = useState<string>('State Diff');

  const navLists: navType = {
    'State Diff': <StateDiff />,
    'Component Tree': <ComponentTree />,
    'Component Graph': (
      <ParentSize>
        {({ width, height }) => (
          <ComponentGraph width={width} height={height} />
        )}
      </ParentSize>
    ),
    'Atom Network': <AtomNetwork />,
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
