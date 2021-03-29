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
    <div className="snapshot" onClick={handleClick}>
      <h4>Snapshot {idx}</h4>
      <button className="jumpButton">Jump</button>
    </div>
  );
}

export default Snapshot;
