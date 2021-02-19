// The initial script that loads the extension into the DevTools panel.
// eslint-disable-next-line no-undef
chrome.devtools.panels.create(
  'Atomic', // title of devtool panel
  '../assets/covalent-recoil-logo.jpg', // icon of devtool panel
  'panel.html' // html of devtool panel
);
