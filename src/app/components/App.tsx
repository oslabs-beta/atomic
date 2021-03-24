/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';
import MainContainer from '../containers/MainContainer';
import { snapshot, componentTree } from '../../types';

interface SnapshotHistoryContext {
  snapshotHistory: snapshot[];
  setSnapshotHistory: React.Dispatch<React.SetStateAction<snapshot[]>>;
}

interface ComponentTreeHistoryContext {
  componentTreeHistory: componentTree[];
  setComponentTreeHistory: React.Dispatch<
    React.SetStateAction<componentTree[]>
  >;
}

interface SnapshotIndexContext {
  snapshotIndex: number;
  setSnapshotIndex: React.Dispatch<React.SetStateAction<number>>;
}

// contexts created for our state values to later reference in child components
export const snapshotHistoryContext = createContext<SnapshotHistoryContext | null>(
  null
);
export const snapshotIndexContext = createContext<
  SnapshotIndexContext | number
>(0);
export const componentTreeHistoryContext = createContext<ComponentTreeHistoryContext | null>(
  null
);

function App(): JSX.Element {
  // useState hook to update the snapshotHistory array -> array of snapshots
  const [snapshotHistory, setSnapshotHistory] = useState<snapshot[]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0);
  const [componentTreeHistory, setComponentTreeHistory] = useState<
    componentTree[]
  >([]);
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
      if (action === 'RECORD_COMPONENT_TREE') {
        setComponentTreeHistory(prevState => [
          ...prevState,
          payload.componentTree,
        ]);
      }
    });
  }, []);

  const renderMainContainer: JSX.Element = (
    <>
      <snapshotHistoryContext.Provider
        value={{ snapshotHistory, setSnapshotHistory }}
      >
        <snapshotIndexContext.Provider
          value={{ snapshotIndex, setSnapshotIndex }}
        >
          <componentTreeHistoryContext.Provider
            value={{ componentTreeHistory, setComponentTreeHistory }}
          >
            <MainContainer />
          </componentTreeHistoryContext.Provider>
        </snapshotIndexContext.Provider>
      </snapshotHistoryContext.Provider>
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
