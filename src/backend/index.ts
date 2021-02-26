/* eslint-disable no-console */

import reactConnect from './fiber';

const fiber = reactConnect()();

console.log('fiber', fiber);

window.postMessage(
  {
    action: 'testGetFiber',
    payload: { fiberRoot: 'fiber' },
  },
  '*'
);
