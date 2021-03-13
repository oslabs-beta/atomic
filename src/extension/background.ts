/* eslint-disable no-console */

/*
sends messages to the content script, using portFromAPP, when the user clicks the extension's browser action.
The background script is the extension's event handler;
it contains listeners for browser events that are important to the extension.
It lies dormant until an event is fired then performs the instructed logic.
An effective background script is only loaded when it is needed and unloaded when it goes idle.

listens for connection attempts from the APP.
when it receives a connection attempt:
stores the port in a variable named portFromAPP.
sends the APP a message using the port.
starts listening to messages received on the port, and logs them.
*/

import { curSnapMock, prevSnapMock } from '../app/mock/mockStateDiff';

let portFromAPP: {
  postMessage: (message: { action: string; payload: any }) => void;
  onMessage: { addListener: (arg0: (m: any) => void) => void };
  sendMessage: (
    message: { action: string; payload: any },
    response: (response: any) => void
  ) => void;
};

function connected(port: any) {
  portFromAPP = port;
  // post messages to dev tool app
  portFromAPP.postMessage({ action: 'CONNECTED', payload: 'hi there APP!' });

  // listen to all messages from dev tool app
  portFromAPP.onMessage.addListener(message => {
    console.log(message);
    const { action } = message;
    console.log('connected to devtool');
    switch (action) {
      case 'GET_SNAPSHOT': {
        console.log('received call to GET_SNAPSHOT');
        // respond by sending message to dev tool app
        portFromAPP.postMessage({
          action: 'RECORD_SNAPSHOT',
          payload: { atomState: curSnapMock },
        });
        break;
      }
    }
  });
}

// receive initial onConnect message from dev tool app (only happens once)
chrome.runtime.onConnect.addListener(connected);

/*
Event listener rece
*/

// On the background.ts, we need to set up a runtime.onMessage event listener to handle messages from content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request -> ', request);
  console.log('sender -> ', sender);

  const tabTitle = sender?.tab?.title;
  const tabId = sender?.tab?.id;
  const { action, index, name, value, type } = request;

  switch (type) {
    case 'SIGN_CONNECT': {
      console.log('connected to devtool');
      break;
    }
  }

  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript

  // tabs.executeScript()
  // Injects JavaScript code into a page. (Inject backend.bundle.js to the current tab)

  switch (action) {
    case 'injectScript': {
      chrome.tabs.executeScript(
        tabId!, // optional integer
        {
          code: `
            // Function will attach script to the DOM
            const injectScript = (file, tag) => {
              const htmlBody = document.getElementsByTagName(tag)[0];
              const script = document.createElement('script');
              script.setAttribute('type', 'text/javascript');
              script.setAttribute('src', file);
              htmlBody.appendChild(script);
            };
            injectScript(chrome.runtime.getURL('bundles/backend.bundle.js'), 'body');
          `,
        },
        _ => {
          const e = chrome.runtime.lastError;
          if (e !== undefined) {
            console.log(tabId, _, e);
          }
        }
      );
      break;
    }

    case 'testGetFiber': {
      console.log(`case 'testGetFiber': portFromAPP -> `, portFromAPP);

      portFromAPP.postMessage({
        action: 'TEST_TO_APP',
        payload: { msg: 'testing' },
      });
    }
  }
});
console.log('running background.ts');
