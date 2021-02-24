/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */

//The background script is the extension's event handler;
//it contains listeners for browser events that are important to the extension.
//It lies dormant until an event is fired then performs the instructed logic.
//An effective background script is only loaded when it is needed and unloaded when it goes idle.

// chrome.runtime.onConnect.addListener(port => {
//   console.log('port in bg is --> ', port);
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request in background.ts is --> ', request);
  console.log('sender in background.ts --> ', sender);

  const tabTitle = sender?.tab?.title;
  const tabId = sender?.tab?.id;
  const { action, index, name, value, type } = request;

  switch (type) {
    case 'SIGN_CONNECT': {
      console.log('connected to devtool');
      break;
    }
  }

  switch (action) {
    case 'injectScript': {
      chrome.tabs.executeScript(
        tabId!,
        {
          code: `
            // Function will attach script to the dom
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
  }
});

console.log('from background.ts');
