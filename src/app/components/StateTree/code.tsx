import React from 'react';
import JSONTree from 'react-json-tree';
import {componentAtomTreeMock} from "../../mock/mockComponentTree"

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
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

const getItemString = (
  type,
  data: { state?: object | string; name: string; children: [] }
) => {
  if (data && data.name) {
    return <span>{data.name}</span>;
  }
  return <span />;
};

interface TreeProps {
  snapshot: {
    name?: string;
    componentData?: object;
    state?: string | object;
    stateSnaphot?: object;
    children?: any[];
  };
}

function CodeJSONTree() {
  return (
    <div className="code">
      {componentAtomTreeMock && (
        <JSONTree
          data={componentAtomTreeMock}
          theme={{ extend: theme, tree: () => ({ className: 'json-tree' }) }}
          shouldExpandNode={() => true}
          getItemString={getItemString}
          labelRenderer={(raw: any[]) => {
            return typeof raw[0] !== 'number' ? <span>{raw[0]}</span> : null;
          }}
        />
      )}
    </div>
  );
}

export default CodeJSONTree;
