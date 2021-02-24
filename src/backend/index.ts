/* eslint-disable no-console */

import reactConnect from './fiber';

const extensionID = 'kdohcinjoneeijkhlaaahdignekaehbn';
console.log('in index.ts');
console.log(reactConnect);

const fiber = reactConnect()();

console.log('index.ts SCOPE ---> ', window);

window.localStorage.setItem(
  'test from index.ts',
  JSON.stringify({ test: 'test' })
);

window.localStorage.setItem(
  'test from index.ts',
  JSON.stringify({ test: 'test' })
);

// chrome.runtime.sendMessage(extensionID, {
//   action: 'testGetFiber',
//   payload: { fiberRoot: 'this is a root' },
// });
