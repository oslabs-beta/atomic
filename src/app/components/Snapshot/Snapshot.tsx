import React from 'react';

interface snapshotProps {
  snapshot?: any;
  idx: number;
}

function Snapshot({ idx }: snapshotProps): JSX.Element {
  // console.log('snapshot in Snapshot: ', snapshot);
  // console.log('key in Snapshot: ', key);
  // console.log('idx in Snapshot: ', idx);
  return (
    <div className="snapshot">
      <button>Idx {idx}</button>
      <p>snapshot</p>
    </div>
  );
}

export default Snapshot;
