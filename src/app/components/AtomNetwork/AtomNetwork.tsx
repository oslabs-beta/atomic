import React, { useState, useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import AtomToReadDependenciesNetwork from './AtomToReadDependenciesNetwork';
import AtomToDependentsNetwork from './AtomToDependentsNetwork';

import { snapshotHistoryContext, snapshotIndexContext } from '../App';

function AtomNetwork(): JSX.Element {
  const [switchToggle, setSwitchToggle] = useState(false);
  const [atomName, setAtomName] = useState<string>('');
  const { snapshotHistory } = useContext<any>(snapshotHistoryContext);
  const { snapshotIndex } = useContext<any>(snapshotIndexContext);

  const atomNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  return (
    <div className="atomNetwork" style={{ height: '95vh' }}>
      <div
        style={{
          display: 'flex',
          marginRight: '25px',
          alignItems: 'center',
          position: 'fixed',
        }}
      >
        <label>Select Atom:</label>
        <select
          onClick={e => e.stopPropagation()}
          onChange={e => setAtomName(e.target?.value || atomNamesArray[0])}
          value={atomName}
          className="dropdown"
        >
          {atomNamesArray.map((atomName, idx) => (
            <option value={atomName} key={idx}>
              {atomName}
            </option>
          ))}
        </select>
        <h3
          className="dependents"
          style={{ color: !switchToggle ? '#1cb5c9' : '#7c7c7c' }}
        >
          Dependents
          <span className="toolTipTest">
            Displays all atoms affected by the parent atom
          </span>
        </h3>

        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => {
              setSwitchToggle(!switchToggle);
            }}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          className="dependencies"
          style={{ color: switchToggle ? '#1cb5c9' : '#7c7c7c' }}
        >
          Read Dependencies
          <span className="toolTipTest">
            Displays all atoms that affect the parent atom
          </span>
        </h3>
      </div>
      {switchToggle ? (
        <ParentSize>
          {({ width, height }) => (
            <AtomToReadDependenciesNetwork
              atomName={atomName || atomNamesArray[0]}
              width={width}
              height={height}
            />
          )}
        </ParentSize>
      ) : (
        <ParentSize>
          {({ width, height }) => (
            <AtomToDependentsNetwork
              atomName={atomName || atomNamesArray[0]}
              width={width}
              height={height}
            />
          )}
        </ParentSize>
      )}
    </div>
  );
}

export default AtomNetwork;
