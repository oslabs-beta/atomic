import React, { useState, useContext, useEffect } from 'react';
import { diff, formatters } from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { snapshotHistoryContext, snapshotIndexContext } from '../App';

function StateDiff(): JSX.Element {
  const { snapshotHistory } = useContext<any>(snapshotHistoryContext);
  const { snapshotIndex, setSnapshotIndex } = useContext<any>(
    snapshotIndexContext
  );
  const [rawToggle, setRawToggle] = useState(false);

  //Set previous and  current snapshots
  let previousSnapshot = snapshotHistory[snapshotIndex - 1];
  let currentSnapshot = snapshotHistory[snapshotIndex];
  //Diff between previous and  current snapshots
  const delta = diff(previousSnapshot, currentSnapshot);

  const html = formatters.html.format(delta, previousSnapshot);
  // conditionally render changes depending on boolean
  formatters.html.showUnchanged(rawToggle);

  useEffect(() => setSnapshotIndex(snapshotHistory.length - 1), [
    snapshotHistory,
  ]);

  return (
    <div className="stateDiff">
      {/* <p>{JSON.stringify(snapshotHistory[snapshotIndex])}</p>  */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem 1rem 0 0',
          alignItems: 'center',
        }}
      >
        {/* <button
          id="raw"
          className="rawToggle"
          style={{ color: rawToggle ? '#E6E6E6' : '#989898' }}
          onClick={() => {
            setRawToggle(!rawToggle);
          }}
        >
          Raw
        </button> */}
        <label
          className="rawSwitch"
        
        >
          <input type="checkbox"   onClick={() => {
            setRawToggle(!rawToggle);
            console.log('rawToggle', rawToggle)
          }}/>
          <span className="rawSlider round"></span>
        </label>
        <h3
          style={{ marginLeft: '5px', color: rawToggle ? '#1cb5c9' : 'white' }}
        >
          Raw
        </h3>
      </div>
      {ReactHtmlParser(html)}
    </div>
  );
}

export default StateDiff;
