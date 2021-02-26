/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
<<<<<<< HEAD
// const fs = require('fs');
=======
>>>>>>> e9b053073832ee90663e870f11d33a190112e65f

import { buildNodeTree } from './resq';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}
<<<<<<< HEAD
const payload = 'test';
const path = './mockFiber.json';
=======
>>>>>>> e9b053073832ee90663e870f11d33a190112e65f

export default (): (() => void) => {
  return () => {
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    // console.log('devTools --> ', devTools);

    // const reactInstance = devTools ? devTools.renderers.get(1) : null;
    // console.log('reactInstance --> ', reactInstance);

    const fiberRoot = devTools.getFiberRoots(1).values().next().value;
    const fiber = fiberRoot.current;

    const testParse = buildNodeTree(fiber);

    console.log('testParse in fiber is--> ', testParse);

    return fiber;

    //traverse fiber generate snapshot. {} //reactTime tree generator to get object //reatime getHooks to get atomName useState
    //traverse fiber to get custom ATOMIC HOOK {atoms information} useAtomic(atom, 'name of atom') //useDebuglabel(string) defaults 'atom1, atom2 ... atomX'
    //send to devtool
    //monkey-patch react hook to update snapshot when react reconciler updates.
    //send update to devtool.
  };
};
