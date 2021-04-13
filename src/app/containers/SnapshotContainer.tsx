import React, { useState, useContext, useEffect, useRef } from 'react';

import {
  snapshotHistoryContext,
  snapshotIndexContext,
} from '../components/App';
import Snapshot from '../components/Snapshot/Snapshot';
import {
  SnapshotHistoryContext,
  SnapshotIndexContext,
} from '../../types/index';

function SnapshotContainer(): JSX.Element {
  const { snapshotHistory, setSnapshotHistory } = useContext<any>(
    snapshotHistoryContext
  );
  const { _, setSnapshotIndex } = useContext<any>(snapshotIndexContext);
  const snapshotEndRef = useRef<HTMLDivElement>(null);

  const [clearSnapshotHistory, setClearSnapshotHistory] = useState(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => scrollToBottom(), [snapshotHistory]);
  const scrollToBottom = (): void => {
    snapshotEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function clearHandleClick() {
    if (snapshotHistory.length === 1) return;
    setCount(count + snapshotHistory.length - 2);
    setSnapshotHistory(snapshotHistory.splice(snapshotHistory.length - 2));
    setSnapshotIndex(1);
    setClearSnapshotHistory(true);
  }

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
                  count={count}
                />
              ) : null
            )
          : snapshotHistory.map((snapshot: any, idx: number) => (
              <Snapshot
                key={`${Math.random() * 1000000000}`}
                idx={idx}
                snapshot={snapshot}
                count={count}
              />
            ))}
      </div>
      <div ref={snapshotEndRef} />
    </div>
  );
}

export default SnapshotContainer;
