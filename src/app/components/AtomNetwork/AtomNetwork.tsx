import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import AtomToComponentNetwork from './AtomToComponentNetwork';


function AtomNetwork(): JSX.Element {
  return (
    <div className="atomNetwork">
      <p>Atom Network</p>
      <ParentSize>{({ width, height }) => <AtomToComponentNetwork width={width} height={height} />}</ParentSize>
    </div>
  );
}

export default AtomNetwork;
