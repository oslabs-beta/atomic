import React, { useContext } from 'react';
import { snapshotHistoryContext, snapshotIndexContext } from '../App';

function StateDiff(): JSX.Element {
  const { snapshotHistory } = useContext<any>(
    snapshotHistoryContext
  );
  const { snapshotIndex } = useContext<any>(
    snapshotIndexContext
  );
  return (
    <div className="stateDiff">
      <p>State Diff</p>
      <p>{JSON.stringify(snapshotHistory[snapshotIndex])}</p>
    </div>
  );
}

export default StateDiff;
