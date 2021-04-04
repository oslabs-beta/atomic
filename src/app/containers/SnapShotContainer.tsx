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

  // //Testing start:
  // const [count, setCount] = useState(0);

  // const handleNewData = () => {
  //   setSnapshotHistory((prevState: any) => [
  //     ...prevState,
  //     snapshotTestArray[count],
  //   ]);
  //   setCount(count + 1);
  //   if (count > 5) {
  //     setCount(0);
  //   }

  //   const copy2 = { ...componentAtomTreeMock };
  //   copy2.name = `${Math.floor(Math.random() * 10000)}`;
  //   setComponentTreeHistory((prevState: any) => [...prevState, copy2]);
  // };
  // useEffect(() => console.log('componentTreeHistory: ', componentTreeHistory), [
  //   componentTreeHistory,
  // ]);
  // //Testing end

  useEffect(() => scrollToBottom(), [snapshotHistory]);
  const scrollToBottom = (): void => {
    snapshotEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function clearHandleClick() {
    setSnapshotHistory(snapshotHistory.splice(snapshotHistory.length-2))
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
          <button onClick={clearHandleClick} className="clearButton" style={{ marginBottom: '15px' }}>
            Clear Snapshot
          </button>
        </div>
      </div>
      <div className="snapshotList">
        {snapshotHistory.slice(1).map((snapshot: any, idx: number) => (
          <Snapshot key={idx} idx={idx} snapshot={snapshot} />
        ))}
      </div>
      <div ref={snapshotEndRef} />
    </div>
  );
}

export default SnapShotContainer;
