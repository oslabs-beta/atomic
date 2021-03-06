import React, { useState, useContext } from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';

import { snapshotHistoryContext, snapshotIndexContext } from '../App';
import {
  SnapshotHistoryContext,
  SnapshotIndexContext,
} from '../../../types/index';

function StateDiff(): JSX.Element {
  const { snapshotHistory } = useContext<SnapshotHistoryContext>(
    snapshotHistoryContext
  );
  const { snapshotIndex } = useContext<SnapshotIndexContext>(
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
      <div className="stateDiffDiv">
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
          style={{
            marginLeft: '7px',
            color: rawToggle ? '#1cb5c9' : '#e6e6e6',
          }}
        >
          Raw
        </h3>
      </div>
    </div>
  );
}

export default StateDiff;
