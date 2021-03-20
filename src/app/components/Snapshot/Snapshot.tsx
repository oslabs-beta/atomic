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
      <p>snapshot {idx}</p>
      <button onClick={handleClick}>Jump</button>
    </div>
  );
}

export default Snapshot;
