import React, { ReactNode } from 'react';
import ReactJson from 'react-json-view';
import { componentAtomTreeMock } from '../../mock/mockComponentTree';

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#202020',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

function StateTree(): ReactNode {
  return (
    <div className="stateTree" style={{ overflowY: 'auto' }}>
      {componentAtomTreeMock && (
        <ReactJson
          src={componentAtomTreeMock}
          style={{
            fontSize: '13px',
            paddingTop: '15px',
            fontFamily: 'Helvetica',
          }}
          theme={theme}
          indentWidth={3}
          enableClipboard={false}
        />
      )}
    </div>
  );
}

export default StateTree;
