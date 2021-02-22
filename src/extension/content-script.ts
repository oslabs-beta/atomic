/* eslint-disable no-console */

//Extensions that read or write to web pages utilize a content script.
//The content script contains JavaScript that executes in the contexts
//of a page that has been loaded into the browser. Content scripts read
//and modify the DOM of web pages the browser visits.
//Content scripts can communicate with their parent extension
//by exchanging messages and storing values using the storage API.

// let firstMessage = true;

window.addEventListener('message', msg => {
  console.log('msg.data in window eventListener ---> ', msg);

  // Event listener runs constantly based on actions
  // recorded on the test application from backend files (linkFiber.ts).

  // // Background.js has a listener that includes switch cases, depending on
  // // the name of the action (e.g. 'tabReload').
  // if (firstMessage) {
  //   // One-time request tells the background script that the tab has reloaded.
  //   chrome.runtime.sendMessage({ action: 'tabReload' });
  //   firstMessage = false;
  // }

  // After tabs object has been created from firstMessage, backend (linkFiber.ts)
  // will send snapshots of the test app's link fiber tree.
  // const { action }: { action: string } = msg.data;
  // if (action === 'recordSnap') {
  //   chrome.runtime.sendMessage(msg.data);
  // }
});

chrome.runtime.sendMessage({ action: 'injectScript' });
console.log('from content-scripts');
