import React from 'react';

function Snapshot({ key, snapshot, idx }): JSX.Element {
  console.log('snapshot in Snapshot: ', snapshot);
  console.log('key in Snapshot: ', key);
  console.log('idx in Snapshot: ', idx);
  return (
    <div className="snapshot">
      <button>Jump {key}</button>
      {/* <button>Idx {idx}</button> */}
      <p>snapshot</p>
    </div>
  );
}

export default Snapshot;
