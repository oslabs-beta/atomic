import React, { useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import AtomToComponentNetwork from './AtomToComponentNetwork';
import AtomToDependentNetwork from './AtomToDependentNetwork';

function AtomNetwork(): JSX.Element {
  const [switchToggle, setSwitchToggle] = useState(false);

  return (
    <div className="atomNetwork">
      <div style={{ position: 'fixed' }}>
        <button
          onClick={() => {
            setSwitchToggle(!switchToggle);
          }}
        >
          Switch
        </button>
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
