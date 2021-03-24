import React, { useState, useContext, useEffect } from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { snapshotHistoryContext, snapshotIndexContext } from '../App';

function StateDiff(): JSX.Element {
  const { snapshotHistory } = useContext<any>(snapshotHistoryContext);
  const { snapshotIndex, setSnapshotIndex } = useContext<any>(
    snapshotIndexContext
  );
  const [rawToggle, setRawToggle] = useState<boolean>(false);

  //Set previous and current snapshots
  let previousSnapshot = snapshotHistory[snapshotIndex - 1];
  let currentSnapshot = snapshotHistory[snapshotIndex];
  //Diff between previous and current snapshots
  const delta: any = diff(previousSnapshot, currentSnapshot);

  const html: any = formatters.html.format(delta, previousSnapshot);
  // conditionally render changes depending on boolean
  formatters.html.showUnchanged(rawToggle);

  return (
    <div className="stateDiff">
      <div>{ReactHtmlParser(html)}</div>
      <div
        style={{
          display: 'flex',
          marginRight: '25px',
          alignItems: 'center',
        }}
      >
        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => {
              setRawToggle(!rawToggle);
            }}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          style={{ marginLeft: '7px', color: rawToggle ? '#1cb5c9' : 'white' }}
        >
          Raw
        </h3>
      </div>
    </div>
  );
}

export default StateDiff;
