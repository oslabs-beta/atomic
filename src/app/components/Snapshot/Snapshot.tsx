import React, { useContext } from 'react';
import { snapshotIndexContext } from '../App';

interface snapshotProps {
  snapshot?: any;
  idx: number;
}

function Snapshot({ idx }: snapshotProps): JSX.Element {
  const { _, setSnapshotIndex } = useContext<any>(snapshotIndexContext);

  const handleClick = () => {
    setSnapshotIndex(idx);
  };

  return (
    <div className="snapshot">
      <button onClick={handleClick}>Jump{idx}</button>
      <p>snapshot</p>
    </div>
  );
}

export default Snapshot;
