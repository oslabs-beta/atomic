// The initial script that loads the extension into the DevTools panel.
// eslint-disable-next-line no-undef

/* 
The DevTools page cannot use most of the extensions APIs directly. 
It has access to the same subset of the extension and runtime APIs that a content script has access to. 
Like a content script, a DevTools page can communicate with the background page using Message Passing. 
For an example, see Injecting a Content Script.
*/

chrome.devtools.panels.create(
  'Atomic', // title of devtool panel
  '../assets/covalent-recoil-logo.jpg', // icon of devtool panel
  'panel.html' // html of devtool panel
);
