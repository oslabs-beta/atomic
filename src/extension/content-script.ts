/* eslint-disable no-console */

import { fiberHelper } from '../backend/index';

//Extensions that read or write to web pages utilize a content script.
//The content script contains JavaScript that executes in the contexts
//of a page that has been loaded into the browser. Content scripts read
//and modify the DOM of web pages the browser visits.
//Content scripts can communicate with their parent extension
//by exchanging messages and storing values using the storage API.

window.addEventListener('message', msg => {
  if (
    msg.data.source != 'react-devtools-bridge' &&
    msg.data.source != 'react-devtools-content-script' &&
    msg.data.source != 'react-devtools-inject-backend' &&
    msg.data.source != 'react-devtools-detector'
  ) {
    console.log('Window MessageEvent -> ', msg);
  }

  const { action }: { action: string } = msg.data;
  if (action === 'TEST_FROM_DEBUGGER_COMPONENT') {
    console.log('message from inspected Application to background -> ', msg);
    chrome.runtime.sendMessage(msg.data);
  }
});

// Inject backend bundle

// send initial message to background script
// chrome.runtime.sendMessage({ action: 'injectScript' });

const injectCode = (code: string) => {
  const script = document.createElement('script');
  script.textContent = code;
  script.setAttribute('type', 'text/javascript');
  // script.setAttribute('src', file);
  // script.src = chrome.extension.getURL('bundles/backend.bundle.js');
  script.async = false;
  document.documentElement.appendChild(script);
  script?.parentNode?.removeChild(script);
};

//Create __ATOMIC_DEVTOOLS_EXTENSION__ hook to inject
const initHook = `
window.__ATOMIC_DEVTOOLS_EXTENSION__ = {}
`;
//
injectCode(
  `${initHook}
  ;(function testINJECT(target) {target.__ATOMIC_DEVTOOLS_EXTENSION__.test = "test"})(window)
  ;(${fiberHelper.toString()}(window))
  `
);
// injectCode(chrome.runtime.getURL('bundles/backend.bundle.js'));
// injectCode(`${initHook}`);

console.log('running content-script.ts');
