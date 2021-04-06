import React, { useState, useContext } from 'react';
import ReactJson from 'react-json-view';
import { componentTreeHistoryContext, snapshotIndexContext } from '../App';

const theme = {
  scheme: 'custom',
  base00: '#202020',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#424242',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#dba86e',
  base0A: '#f4bf75',
  base0B: '#bde272',
  base0C: '#41b69c',
  base0D: '#1cb5c9',
  base0E: '#7f5dc0',
  base0F: '#d13164',
};

function ComponentTree(): JSX.Element {
  const [expandToggle, setExpandToggle] = useState<boolean>(true);
  const { componentTreeHistory } = useContext<any>(componentTreeHistoryContext);
  const { snapshotIndex } = useContext<any>(snapshotIndexContext);

  return (
    <div className="componentTree">
      <div>
        {componentTreeHistory[snapshotIndex] && (
          <ReactJson
            src={componentTreeHistory[snapshotIndex]}
            style={{
              fontSize: '12px',
              paddingTop: '15px',
              paddingLeft: '10px',
              fontFamily: 'Helvetica',
            }}
            collapsed={expandToggle ? 3 : false}
            theme={theme}
            indentWidth={3}
            enableClipboard={false}
          />
        )}
      </div>
      <div className="componentTreeDiff">
        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => {
              setExpandToggle(!expandToggle);
            }}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          style={{
            marginLeft: '7px',
            color: !expandToggle ? '#1cb5c9' : '#e6e6e6',
          }}
        >
          Expand
        </h3>
      </div>
    </div>
  );
}

export default ComponentTree;
