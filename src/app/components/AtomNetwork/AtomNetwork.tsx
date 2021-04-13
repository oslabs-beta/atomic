import React, { useState, useContext } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import AtomToReadDependenciesNetwork from './AtomToReadDependenciesNetwork';
import AtomToDependentsNetwork from './AtomToDependentsNetwork';
import { snapshotHistoryContext, snapshotIndexContext } from '../App';
import { SnapshotHistoryContext, SnapshotIndexContext } from '../../../types';

function AtomNetwork(): JSX.Element {
  const { snapshotHistory } = useContext<SnapshotHistoryContext>(
    snapshotHistoryContext
  );
  const { snapshotIndex } = useContext<SnapshotIndexContext>(
    snapshotIndexContext
  );
  const [switchToggle, setSwitchToggle] = useState<boolean>(false);
  const [atomName, setAtomName] = useState<string>('');

  //Array of atom names in current snapshot
  const atomNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  return (
    <div className="atomNetwork" style={{ height: '95vh' }}>
      {/* Switch toggle between dependents and read dependencies */}
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
          // Event.stopPropagation:
          // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_stoppropagation
          onClick={e => e.stopPropagation()}
          // Reset back to first atom if atom name does not exist in snapshot
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
          style={{
            color: !switchToggle ? '#1cb5c9' : '#7c7c7c',
            borderBottom: !switchToggle
              ? '1px dotted #1cb5c9'
              : '1px dotted #7c7c7c',
          }}
        >
          Dependents
          <span className="toolTipTest">
            Displays all atoms affected by the parent atom
          </span>
        </h3>

        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => setSwitchToggle(!switchToggle)}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          className="dependencies"
          style={{
            color: switchToggle ? '#1cb5c9' : '#7c7c7c',
            borderBottom: switchToggle
              ? '1px dotted #1cb5c9'
              : '1px dotted #7c7c7c',
          }}
        >
          Read Dependencies
          <span className="toolTipTest">
            Displays all atoms that affect the parent atom
          </span>
        </h3>
      </div>
      {/* Display atom to dependents OR atom to read dependencies */}
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
