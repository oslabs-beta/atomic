/* eslint-disable no-console */
import React, { createContext, useState } from 'react';
import { diff } from 'jsondiffpatch';
import MainContainer from '../containers/MainContainer';
import { stateSnapshot, selectedTypes, stateSnapshotDiff } from '../../types';

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connect

// runtime.connect()
// Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging.

// Make a connection between different contexts inside the extension.

// Connection type
// DevTool App to background script
// Initiate connection attempt from DevTool App
// runtime.connect()
// Handle connection attempt
// runtime.onConnect
const port = chrome.runtime.connect({ name: 'port-from-app-to-bg' });

// Port through which messages can be sent and received. The port's  onDisconnect event is fired if the extension does not exist.
console.log('runtime.Port -> ', port);

port.onMessage.addListener((message: { action: string; payload: any }) => {
  console.log('Received message from background script: ', message);
});

//FRONTEND:
interface SnapshotHistoryContext {
  snapshotHistory: Partial<stateSnapshot[]>;
  setSnapshotHistory: React.Dispatch<React.SetStateAction<stateSnapshot[]>>;
}

interface SelectedContext {
  selected: selectedTypes[];
  setSelected: React.Dispatch<React.SetStateAction<selectedTypes[]>>;
}

interface FilterContext {
  filter: stateSnapshotDiff[];
  setFilter: React.Dispatch<React.SetStateAction<stateSnapshotDiff[]>>;
}

// contexts created for our state values to later reference in child components
export const snapshotHistoryContext = createContext<SnapshotHistoryContext | null>(
  null
);
export const selectedContext = createContext<SelectedContext | null>(null);
export const filterContext = createContext<FilterContext | null>(null);

function App(): JSX.Element {
  // useState hook to update the snapshotHistory array
  // array of snapshots
  const [snapshotHistory, setSnapshotHistory] = useState<stateSnapshot[]>([]);
  // selected will be an array with objects containing filteredSnapshot key names (the atoms and selectors)
  // ex: [{name: 'Atom1'}, {name: 'Atom2'}, {name: 'Selector1'}, ...]
  // -> ex: [{Atom1: node}, {Atom2: node}, {Selector1: node}, ...]

  const [selected, setSelected] = useState<selectedTypes[]>([]);
  // Filter is an array of objects containing differences between snapshots
  let [filter, setFilter] = useState<stateSnapshotDiff[]>([]);

  const renderMainContainer: JSX.Element = (
    <filterContext.Provider value={{ filter, setFilter }}>
      <selectedContext.Provider value={{ selected, setSelected }}>
        <snapshotHistoryContext.Provider
          value={{ snapshotHistory, setSnapshotHistory }}
        >
          <MainContainer />
          <button
            onClick={() =>
              port.postMessage({ action: 'hello from DevTool App' })
            }
          >
            POST TO Background.ts
          </button>
        </snapshotHistoryContext.Provider>
      </selectedContext.Provider>
    </filterContext.Provider>
  );
  // Render module not found message if snapHistory is null, this means we have not detected a recoil app with recoilize module installed properly
  // const renderModuleNotFoundContainer: JSX.Element = (
  //   <div className="notFoundContainer">
  //     <img className="logo" src={LOGO_URL} />
  //     <p>
  //       Supported only with Recoil apps with the Recoilize NPM module. Follow
  //       the installation instructions at
  //       <br />
  //       <a target="_blank" href="https://github.com/open-source-labs/Recoilize">
  //         Recoilize
  //       </a>
  //     </p>
  //   </div>
  // );

  console.log('hello from App.tsx');
  return <div className="app">{renderMainContainer}</div>;
}

export default App;
