/* eslint-disable no-console */
import React, { ReactNode } from 'react';

// List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

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
const port = chrome.runtime.connect({name: "port-from-app-to-bg" });


// Port through which messages can be sent and received. The port's  onDisconnect event is fired if the extension does not exist.
console.log('runtime.Port -> ', port);
console.log('')

port.onMessage.addListener(
  (message: {
    action: string;
    payload: Record<string, unknown>;
  }) => {
    console.log('Received message from background script: ', message);
  }
);

function App({ team }: { team: string }) {
  console.log('hello from App.tsx');
  return (
    <>
      <strong>{team} :</strong>
      <List
        items={['Giovanni', 'Logan', 'Stanley', 'Chandni']}
        render={(item: string) => <div>{item}</div>}
      ></List>
      <button onClick={() => port.postMessage({ action: 'hello from DevTool App' })}>
        POST TO Background.ts
      </button>
    </>
  );
}

export default App;
