import React, { useContext } from 'react';

import { snapshotIndexContext } from '../App';
import { Snapshot,SnapshotIndexContext } from '../../../types/index';

interface SnapshotProps {
  snapshot?: Snapshot;
  idx: number;
  count: number;
}

function Snapshot({ idx, count }: SnapshotProps): JSX.Element {
  const { snapshotIndex, setSnapshotIndex } = useContext<any>(
    snapshotIndexContext
  );

  const handleClick = () => setSnapshotIndex(idx);

  return (
    <div
      className="snapshot"
      onClick={handleClick}
      style={
        snapshotIndex !== idx
          ? { color: '#1cb5c9' }
          : { color: '#e6e6e6', backgroundColor: '#202020' }
      }
    >
      <h4>Snapshot {count + idx}</h4>
      <button className="jumpButton">Jump</button>
    </div>
  );
}

export default Snapshot;
