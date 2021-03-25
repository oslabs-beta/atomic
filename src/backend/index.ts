/* eslint-disable no-console */

import reactConnect from './fiber';

const fiber = reactConnect()();

console.log('fiber', fiber);

const __ATOMIC_DEVTOOLS_EXTENSION__ = () => {
  console.log('__ATOMIC_DEVTOOLS_EXTENSION__ is accessible');
};

window.__ATOMIC_DEVTOOLS_EXTENSION__ = __ATOMIC_DEVTOOLS_EXTENSION__;

window.postMessage(
  {
    action: 'testGetFiber',
    payload: { fiberRoot: 'fiber' },
  },
  '*'
);
