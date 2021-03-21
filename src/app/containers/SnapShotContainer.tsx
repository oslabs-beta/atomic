import React, { useContext, useEffect, useRef } from 'react';
import { snapshotHistoryContext } from '../components/App';
import { prevSnapMock } from '../../app/mock/mockStateDiff';
import Snapshot from '../components/Snapshot/Snapshot';

function SnapShotContainer(): JSX.Element {
  const { snapshotHistory, setSnapshotHistory } = useContext<any>(
    snapshotHistoryContext
  );
  const snapshotEndRef = useRef<HTMLDivElement>(null);

  const handleNewData = () => {
    const copy = { ...prevSnapMock };
    copy.resetSquaresAtom = { ...copy.resetSquaresAtom };
    copy.resetSquaresAtom.contents = Math.floor(Math.random() * 10000);
    setSnapshotHistory((prevState: any) => [...prevState, copy]);
  };

  useEffect(() => scrollToBottom(), [snapshotHistory]);

  const scrollToBottom = (): void => {
    snapshotEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <button onClick={handleNewData} style={{ marginBottom: '15px' }}>
            ADD SnapShot
          </button>
        </div>
      </div>
      <div className="snapshotList">
        {snapshotHistory.map((snapshot: any, idx: number) => (
          <Snapshot key={idx} idx={idx} snapshot={snapshot} />
        ))}
      </div>
      <div ref={snapshotEndRef} />
    </div>
  );
}

export default SnapShotContainer;
