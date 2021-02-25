/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// const fs = require('fs');

import { buildNodeTree } from './resq';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}
const payload = 'test';
const path = './mockFiber.json';

export default (): (() => void) => {
  return () => {
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    console.log('devTools --> ', devTools);

    const reactInstance = devTools ? devTools.renderers.get(1) : null;

    console.log('reactInstance --> ', reactInstance);

    const fiberRoot = devTools.getFiberRoots(1).values().next().value;

    console.log('fiberRoot --> ', fiberRoot);

    const fiber = fiberRoot.current;

    console.log('fiber --> ', fiber);

    const testParse = buildNodeTree(fiber);

    console.log('testParse in fiber is--> ', testParse);

    // window.localStorage.setItem('fiber', fiber);
    // eslint-disable-next-line prettier/prettier

    /* componentTree = {
      name: root,
      level: 0,
      children: [{
        name: root,
        level: 1,
        children: [{}, {}]
        siblings: [{}, {}]
      }, {}]
      siblings: []
    } */

    // const [{child: [{}, {}]]

    // function helperFunc(node) {

    // }
    // */

    //traverseG(fiberRoot, helperFunc)

    //traverse fiber generate snapshot. {} //reactTime tree generator to get object //reatime getHooks to get atomName useState
    //traverse fiber to get custom ATOMIC HOOK {atoms information} useAtomic(atom, 'name of atom') //useDebuglabel(string) defaults 'atom1, atom2 ... atomX'
    //send to devtool
    //monkey-patch react hook to update snapshot when react reconciler updates.
    //send update to devtool.
  };
};
