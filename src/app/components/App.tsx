/* eslint-disable no-console */
import React, { ReactNode } from 'react';

import MainContainer from '../containers/MainContainer';

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

function App(): JSX.Element {
  console.log('hello from App.tsx');
  return (
    <div className="app">
      <MainContainer />
      <button
        onClick={() => port.postMessage({ action: 'hello from DevTool App' })}
      >
        POST TO Background.ts
      </button>
    </div>
  );
}

export default App;
