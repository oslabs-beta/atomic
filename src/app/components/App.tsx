/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';
import { diff } from 'jsondiffpatch';
import MainContainer from '../containers/MainContainer';
import { stateSnapshot, selectedTypes, stateSnapshotDiff } from '../../types';
import { curSnapMock, prevSnapMock } from '../../app/mock/mockStateDiff';
// interface SnapshotHistoryContext {
//   snapshotHistory: Partial<stateSnapshot[]>;
//   setSnapshotHistory: React.Dispatch<React.SetStateAction<stateSnapshot[]>>;
// }

// contexts created for our state values to later reference in child components
// export const snapshotHistoryContext = createContext<SnapshotHistoryContext | null>(
//   null
// );

function App(): JSX.Element {
  // useState hook to update the snapshotHistory array -> array of snapshots
  const [snapshotHistory, setSnapshotHistory] = useState<stateSnapshot[]>([]);

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

    // Port through which messages can be sent and received. The port's onDisconnect event is fired if the extension does not exist.
    console.log('runtime.Port -> ', port);

    // INITIALIZE connection to bg script
    //TODO: update action name to match bg script
    port.postMessage({
      action: 'DEV_INITIALIZED',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // listen for messages FROM background script
    port.onMessage.addListener((message: { action: string; payload: any }) => {
      console.log('Received message from background script: ', message);
      let { action, payload } = message;

      if (action === 'RECORD_SNAPSHOT') {
        setSnapshotHistory(prevState => [...prevState, payload.atomState]);
      }
    });
  }, []);

  //FOR TESTING:
  const handleNewData = () => {
    setSnapshotHistory(prevState => [...prevState, prevSnapMock]);
  };

  const renderMainContainer: JSX.Element = (
    <>
      {/* <MainContainer atomState={atomState} /> */}
      <button onClick={handleNewData}>POST TO Background.ts</button>
      <p>{JSON.stringify(snapshotHistory)}</p>
    </>
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
