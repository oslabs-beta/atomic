import React, { useContext } from 'react';
import { snapshotHistoryContext } from '../components/App';
import { prevSnapMock } from '../../app/mock/mockStateDiff';
import Snapshot from '../components/Snapshot/Snapshot';

function SnapShotContainer(): JSX.Element {
  const { snapshotHistory, setSnapshotHistory } = useContext(
    snapshotHistoryContext
  );

  const handleNewData = () => {
    const copy = { ...prevSnapMock };
    copy.resetSquaresAtom = { ...copy.resetSquaresAtom };
    copy.resetSquaresAtom.contents = Math.floor(Math.random() * 10000);
    setSnapshotHistory(prevState => [...prevState, copy]);
  };

  return (
    <div className="snapShotsContainer">
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
      <button onClick={handleNewData}>ADD SnapShot</button>
      <p>SnapShotContainer</p>
      {snapshotHistory.map((snapshot, idx) => {
        console.log('idx in SnapShotContainer: ', idx);
        return <Snapshot key={idx.toString()} idx={idx} snapshot={snapshot} />;
      })}
      {/* <p>{JSON.stringify(snapshotHistory)}</p> */}
    </div>
  );
}

export default SnapShotContainer;
