/* eslint-disable no-console */

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
    msg.data.source != 'react-devtools-inject-backend'
  ) {
    console.log('Window MessageEvent -> ', msg);
  }

  const { action }: { action: string } = msg.data;
  if (action === 'testGetFiber') {
    console.log('message from backend to background -> ', msg);
    chrome.runtime.sendMessage(msg.data);
  }
});

// send initial message to background script
chrome.runtime.sendMessage({ action: 'injectScript' });

console.log('running content-script.ts');
