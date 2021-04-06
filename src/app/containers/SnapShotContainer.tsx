import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  snapshotHistoryContext,
  componentTreeHistoryContext,
} from '../components/App';
import Snapshot from '../components/Snapshot/Snapshot';
//Testing:
import { snapshotTestArray } from '../../app/mock/mockStateDiff';
import { componentAtomTreeMock } from '../../app/mock/mockComponentTree';

function SnapShotContainer(): JSX.Element {
  const { snapshotHistory, setSnapshotHistory } = useContext<any>(
    snapshotHistoryContext
  );
  const { componentTreeHistory, setComponentTreeHistory } = useContext<any>(
    componentTreeHistoryContext
  );
  const snapshotEndRef = useRef<HTMLDivElement>(null);

  const [clearSnapshotHistory, setClearSnapshotHistory] = useState(false);


  useEffect(() => scrollToBottom(), [snapshotHistory]);
  const scrollToBottom = (): void => {
    snapshotEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function clearHandleClick() {
    setSnapshotHistory(snapshotHistory.splice(snapshotHistory.length - 2));
    setClearSnapshotHistory(true);
  }

  useEffect(() => console.log('snapshotHistory: ', snapshotHistory), [
    snapshotHistory,
  ]);

  return (
    <div className="snapShotsContainer">
      <div className="header">
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '17px',
            paddingTop: '0px',
            marginTop: '10px',
          }}
        >
          ATOMIC{' '}
        </p>
        <div>
          <button
            onClick={clearHandleClick}
            className="clearButton"
            style={{ marginBottom: '15px' }}
          >
            Clear Snapshot
          </button>
        </div>
      </div>
      <div className="snapshotList">
        {clearSnapshotHistory
          ? snapshotHistory.map((snapshot: any, idx: number) =>
              idx > 0 ? (
                <Snapshot
                  key={`${Math.random() * 1000000000}`}
                  idx={idx}
                  snapshot={snapshot}
                />
              ) : null
            )
          : snapshotHistory.map((snapshot: any, idx: number) => (
              <Snapshot
                key={`${Math.random() * 1000000000}`}
                idx={idx}
                snapshot={snapshot}
              />
            ))}
      </div>
      <div ref={snapshotEndRef} />
    </div>
  );
}

export default SnapShotContainer;
