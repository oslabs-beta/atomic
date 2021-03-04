/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';
import { diff } from 'jsondiffpatch';
import MainContainer from '../containers/MainContainer';
import {
  stateSnapshot,
  selectedTypes,
  stateSnapshotDiff,
  filteredSnapshot,
} from '../../types';

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
  // useState hook to update the snapshotHistory array -> array of snapshots
  const [snapshotHistory, setSnapshotHistory] = useState<stateSnapshot[]>([]);
  // selected will be an array of objects containing filteredSnapshot atom names
  // ex: [{name: 'Atom1'}, {name: 'Atom2'}, {name: 'Selector1'}, ...]??
  const [selected, setSelected] = useState<selectedTypes[]>([]);
  // Filter is an array of objects containing differences between snapshots
  let [filter, setFilter] = useState<stateSnapshotDiff[]>([]);

  // Whenever snapshotHistory changes, useEffect will run, and selected will be updated
  useEffect(() => {
    let last;
    // if there's a last element in the snapshotHistory array, then assign last variable to the last {atomName: {content:, nodeDeps:}} object
    if (snapshotHistory[snapshotHistory.length - 1]) {
      last = snapshotHistory[snapshotHistory.length - 1].filteredSnapshot;
    }
    // we must compare with the original
    for (let key in last) {
      // if there's no filtered snapshot key at first index of snapshot history array
      if (!snapshotHistory[0].filteredSnapshot[key]) {
        // only push if the name doesn't already exist
        const check = () => {
          for (let i = 0; i < selected.length; i++) {
            // break if it exists
            if (selected[i].name === key) {
              return true;
            }
          }
          // does not exist
          return false;
        };
        if (!check()) {
          selected.push({ name: key });
        }
      }
    }
  }, [snapshotHistory]); // Only re-run the effect if snapshot history changes -- react hooks
  // useEffect for snapshotHistory

  //***********
  //CHROME EXTENSION CONNECTION:
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

  //TODO: is useEffect needed??
  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'port-from-app-to-bg' });

    // Port through which messages can be sent and received. The port's  onDisconnect event is fired if the extension does not exist.
    console.log('runtime.Port -> ', port);
    
    // INITIALIZE connection to bg script
    //TODO: update action name to match bg script
    port.postMessage({
      action: 'devToolInitialized',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // listen for messages FROM bg script
    port.onMessage.addListener((message: { action: string; payload: any }) => {
      console.log('Received message from background script: ', message);
        const {action, payload} = message
        if(action === "recordSnapshot"){
            //Set the initial selected useState -> ex: [{name: 'Atom1'}, {name: 'Atom2'}]
            if (!payload[1] || !filter.length) {
              //This ensure we only set initially
              const initialArray: selectedTypes[] = []
              //iterate over intial payload received from bg
              for(let key in payload[0].filteredSnapshot){
                //TODO:Thurs
              }
            }
        }
    });
    console.log('hello from App.tsx');
  }, []);


  const renderMainContainer: JSX.Element = (
    <filterContext.Provider value={{ filter, setFilter }}>
      <selectedContext.Provider value={{ selected, setSelected }}>
        <snapshotHistoryContext.Provider
          value={{ snapshotHistory, setSnapshotHistory }}
        >
          <MainContainer />
          {/* <button
            onClick={() =>
              port.postMessage({ action: 'hello from DevTool App' })
            }
          >
            POST TO Background.ts
          </button> */}
        </snapshotHistoryContext.Provider>
      </selectedContext.Provider>
    </filterContext.Provider>
  );
  // Render module not found message if snapHistory is null, this means we have not detected Atomic app 
  // const renderModuleNotFoundContainer: JSX.Element = (
  //   <div className="notFoundContainer">
  //     <img className="logo" src={LOGO_URL} />
  //     <p>
  //       Supported only with Jotai apps with the Atomic NPM module. Follow
  //       the installation instructions at
  //       <br />
  //       <a target="_blank" href="">
  //         ATOMIC
  //       </a>
  //     </p>
  //   </div>
  // );

  return <div className="app">{renderMainContainer}</div>;
}

export default App;
