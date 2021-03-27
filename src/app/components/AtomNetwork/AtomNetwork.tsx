import React, { useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import AtomToComponentNetwork from './AtomToComponentNetwork';
import AtomToDependentNetwork from './AtomToDependentNetwork';

function AtomNetwork(): JSX.Element {
  const [switchToggle, setSwitchToggle] = useState(false);

  return (
    <div className="atomNetwork">
      {/* <div style={{ position: 'fixed' }}>
        <button
          onClick={() => {
            setSwitchToggle(!switchToggle);
          }}
        >
          Switch
        </button>
      </div> */}
      <div
        style={{
          display: 'flex',
          marginRight: '25px',
          alignItems: 'center',
          position: 'fixed'
        }}
      >
        <h3
          style={{
            marginRight: '7px',
            color: !switchToggle ? '#1cb5c9' : "#7c7c7c",
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
            color: switchToggle ? '#1cb5c9' : "#7c7c7c",
          }}
        >
          Components
        </h3>
      </div>
      {switchToggle ? (
        <ParentSize>
          {({ width, height }) => (
            <AtomToComponentNetwork width={width} height={height} />
          )}
        </ParentSize>
      ) : (
        <ParentSize>
          {({ width, height }) => (
            <AtomToDependentNetwork width={width} height={height} />
          )}
        </ParentSize>
      )}
    </div>
  );
}

export default AtomNetwork;
