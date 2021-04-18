/* eslint-disable no-debugger */
/* eslint-disable no-console */

import { fiberHelper } from '../backend/index';
import { windowActions } from '../types';

//Extensions that read or write to web pages utilize a content script.
//The content script contains JavaScript that executes in the contexts
//of a page that has been loaded into the browser. Content scripts read
//and modify the DOM of web pages the browser visits.
//Content scripts can communicate with their parent extension
//by exchanging messages and storing values using the storage API.

/****************************************************************
 *
 * Communication between inspected application
 *
 ****************************************************************/
window.addEventListener('message', msg => {
  const { action }: { action: windowActions } = msg.data;

  switch (action) {
    //This listens for most recent atom state from inspected application and sends to background.ts
    case 'RECORD_ATOM_SNAPSHOT': {
      chrome.runtime.sendMessage(msg.data);
      break;
    }
    //This listens for most recent fiber tree from inspected application and sends to background.ts
    case 'RECORD_FIBER': {
      chrome.runtime.sendMessage(msg.data);
      break;
    }
  }
});

/****************************************************************
 *
 * Global Hook Installation
 *
 ****************************************************************/

/**
 * InjectCode creates a script tag and appended to the document before <head>
 * This <script> tag contains javaScript responsible for initializing the __ATOMIC_DEVTOOLS_EXTENSION__ hook.
 * @param code javascript to be run in the inspected application environment.
 */
const injectCode = (code: string) => {
  const script = document.createElement('script');
  script.textContent = code;
  script.setAttribute('type', 'text/javascript');
  script.async = false;
  document.documentElement.appendChild(script);
  script?.parentNode?.removeChild(script);
};

//Create and attach to window object the __ATOMIC_DEVTOOLS_EXTENSION__ hook
const initHook = `
window.__ATOMIC_DEVTOOLS_EXTENSION__ = {}
`;
//This will inject code before <head> tag
//FiberHelper is __REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot() wrapper
//* This is where we will add any additional helper functions to the __ATOMIC_DEVTOOLS_EXTENSION__ hook

injectCode(
  `${initHook}
  ;(${fiberHelper.toString()}(window));
  // debugger;
  `
);
