import React, { useState, useContext, useEffect } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import AtomToComponentNetwork from './AtomToComponentNetwork';
import AtomToDependentNetwork from './AtomToDependentNetwork';

import { snapshotHistoryContext, snapshotIndexContext } from '../App';

const dropDownStyle = {
  margin: '0.5em',
  fontSize: '12px',
  borderRadius: '4px',
  backgroundColor: '#242529',
  color: 'white',
  padding: '2px',
};

function AtomNetwork(): JSX.Element {
  const [switchToggle, setSwitchToggle] = useState(false);
  const [atomName, setAtomName] = useState<string>('');
  const { snapshotHistory } = useContext<any>(snapshotHistoryContext);
  const { snapshotIndex } = useContext<any>(snapshotIndexContext);

  const atomNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  useEffect(()=>{
    setAtomName(atomNamesArray[0])
  },[snapshotIndex])
  
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
        // onClick={e => e.stopPropagation()}
        onChange={e => setAtomName(e.target.value)}
        value={atomName}
        style={dropDownStyle}
      >
        {atomNamesArray.map((atomName, idx) => (
         
          <option value={atomName} key={idx}>{atomName}</option>
        ))}
      </select>
        <h3
          style={{
            marginRight: '7px',
            marginLeft:"10px",
            color: !switchToggle ? '#1cb5c9' : '#7c7c7c',
          }}
        >
          Dependents
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
          style={{
            marginLeft: '7px',
            color: switchToggle ? '#1cb5c9' : '#7c7c7c',
          }}
        >
          Components
        </h3>
      </div>
      {switchToggle ? (
        <ParentSize  >
          {({ width, height }) => (
            <AtomToComponentNetwork atomName={atomName} width={width} height={height} />
          )}
        </ParentSize>
      ) : (
        <ParentSize>
          {({ width, height }) => (
            <AtomToDependentNetwork atomName={atomName} width={width} height={height} />
          )}
        </ParentSize>
      )}
    </div>
  );
}

export default AtomNetwork;
