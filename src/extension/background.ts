/**
 * this is a comment
 * TODO this is a todo
 * *this is an important
 * ?this is a query
 * !This is a warning
 * @param myParam desciption
 */

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
import { componentAtomTreeMock } from '../app/mock/mockComponentTree';

let atomState = {};

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
    const { action } = message;

    switch (action) {
      case 'DEV_INITIALIZED': {
        // respond by sending message to dev tool app
        console.log('atomState in port ----> ', atomState);

        portFromAPP.postMessage({
          action: 'RECORD_ATOM_SNAPSHOT',
          payload: { atomState },
        });

        portFromAPP.postMessage({
          action: 'RECORD_COMPONENT_TREE',
          payload: { componentTree: componentAtomTreeMock },
        });

        break;
      }

      // case 'TIME_TRAVEL': {
      //   //to Content-Scipts
      //   chrome.runtime.sendMessage();
      //   break;
      // }
    }
  });
}

// receive initial onConnect message from dev tool app (only happens once)
chrome.runtime.onConnect.addListener(connected);

// On the background.ts, we need to set up a runtime.onMessage event listener to handle messages from content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request -> ', request);
  console.log('sender -> ', sender);

  //TODO save data

  const tabTitle = sender?.tab?.title;
  const tabId = sender?.tab?.id;
  const { action, payload } = request;

  // switch (type) {
  //   case 'SIGN_CONNECT': {
  //     console.log('connected to devtool');
  //     break;
  //   }
  // }

  switch (action) {
    case 'testGetFiber': {
      console.log(`case 'testGetFiber': portFromAPP -> `, portFromAPP);

      portFromAPP.postMessage({
        action: 'TEST_TO_APP',
        payload: { msg: 'testing' },
      });

      break;
    }

    case 'TEST_FROM_DEBUGGER_COMPONENT': {
      atomState = payload.atomState;

      portFromAPP.postMessage({
        action: 'RECORD_ATOM_SNAPSHOT',
        payload: { atomState },
      });

      break;
    }
  }
});

console.log('running background.ts');
