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

import { portMessage } from '../types';

//Store for inspected application atom state
const atomState = {};

//Store for inspected application fiber tree
const componentTree = {};

//Store for multiple inspected application ports
const applicationPorts = {};

/****************************************************************
 *
 * Communication between DevTool App.js
 *
 ****************************************************************/

type portFromAPPType = {
  name: string;
  postMessage: (message: portMessage) => void;
  onMessage: { addListener: (arg0: (message: portMessage) => void) => void };
  sendMessage: (
    message: portMessage,
    response: (response: any) => void
  ) => void;
};

function connected(port: any) {
  applicationPorts[port.name] = port;

  //Post messages upon connecting to dev tool app
  //TODO Any relevant information the dev tool need on establishing port connection to dev tool app is sent here
  applicationPorts[port.name].postMessage({
    action: 'CONNECTED_TO_DEVTOOL',
    payload: 'connected to background',
  });

  //Listen to all messages from dev tool app
  applicationPorts[port.name].onMessage.addListener((message: portMessage) => {
    const { action, tabId } = message;

    switch (action) {
      //Receive message upon loading dev tool app and sends initial snapshot and fiber tree
      case 'DEV_INITIALIZED': {
        //Respond by sending stored atom state to dev tool app
        applicationPorts[tabId].postMessage({
          action: 'RECORD_ATOM_SNAPSHOT',
          payload: { atomState: atomState[tabId] },
        });
        //Respond by sending stored component tree to dev tool app
        applicationPorts[tabId].postMessage({
          action: 'RECORD_COMPONENT_TREE',
          payload: { componentTree: componentTree[tabId] },
        });
        break;
      }

      // case 'TIME_TRAVEL': {
      //   chrome.runtime.sendMessage();
      //   break;
      // }
    }
  });
}

//Receive initial onConnect message from dev tool app (only happens once)
chrome.runtime.onConnect.addListener(connected);

//TODO Handle port disconnect
//TODO Handle port errors

/****************************************************************
 *
 * Communication between content-script.js
 *
 ****************************************************************/

// On the background.ts, we need to set up a runtime.onMessage event listener to handle messages from content scripts.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const tabId = sender?.tab?.id;

  const { action, payload } = request;

  switch (action) {
    //This sends most recent atoms state from inspected application to dev tool app
    case 'RECORD_ATOM_SNAPSHOT': {
      atomState[tabId] = payload.atomState;
      applicationPorts[tabId].postMessage({
        tabId,
        action: 'RECORD_ATOM_SNAPSHOT',
        payload: { atomState: atomState[tabId] },
      });
      break;
    }

    //This sends most recent fiber tree from onCommitFiberRoot to dev tool app
    case 'RECORD_FIBER': {
      componentTree[tabId] = payload.componentTree;
      applicationPorts[tabId].postMessage({
        tabId,
        action: 'RECORD_COMPONENT_TREE',
        payload: { componentTree: componentTree[tabId] },
      });
      break;
    }
  }
});
