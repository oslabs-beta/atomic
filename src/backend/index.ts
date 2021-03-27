/* eslint-disable no-console */

// import reactConnect from './fiber';

declare global {
  interface Window {
    __ATOMIC_DEVTOOLS_EXTENSION__: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

/*
From Fiber.ts
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// const fs = require('fs');

import { buildNodeTree, getProviderState } from './resq';
import { throttle } from './helpers';

export function fiberHelper(target: Window) {
  const payload = 'test';

  // function updateSnapShotTree(snap: Snapshot, mode: Mode): void {
  //   // this is the currently active root fiber(the mutable root of the tree)
  //   if (fiberRoot) {
  //     const { current } = fiberRoot;
  //     //Clears circular component table
  //     circularComponentTable.clear();
  //     //creates snapshot that is a tree based on properties in fiberRoot object
  //     snap.tree = createTree(current);
  //   }
  //   //sends the updated tree back
  //   sendSnapshot(snap, mode);
  // }

  let providerState;

  const liftedOnCommitFiberRoot = (): (() => void) => {
    return () => {
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      // const sendToAtomicDevtools = window.__ATOMIC_DEVTOOLS_EXTENSION__.send

      // console.log('devTools --> ', devTools);
      // console.log('reactInstance --> ', reactInstance);

      let fiberRoot = devTools.getFiberRoots(1).values().next().value;
      const reactInstance = devTools ? devTools.renderers.get(1) : null;

      // const throttledUpdateSnapshot = throttle(
      //   () => updateSnapShotTree(snap, mode),
      //   70
      // );

      if (reactInstance && reactInstance.version) {
        devTools.onCommitFiberRoot = (function (original) {
          return function (...args: any[]) {
            // eslint-disable-next-line prefer-destructuring
            console.log('IN ONCOMMITFIBEROOT__________', ...args);
            fiberRoot = args[1];
            // if (doWork) {
            //   throttledUpdateSnapshot();
            // }

            providerState = getProviderState(fiberRoot.current);

            // console.log(
            //   'testParse in fiber is--> ',
            //   buildNodeTree(fiberRoot.current)
            // );

            // sendToAtomicDevtools(buildNodeTree(fiberRoot.current))

            return original(...args);
          };
        })(devTools.onCommitFiberRoot);
      }
      // throttledUpdateSnapshot();
      return fiberRoot;
    };

    //traverse fiber generate snapshot. {} //reactTime tree generator to get object //reatime getHooks to get atomName useState
    //traverse fiber to get custom ATOMIC HOOK {atoms information} useAtomic(atom, 'name of atom') //useDebuglabel(string) defaults 'atom1, atom2 ... atomX'
    //send to devtool
    //monkey-patch react hook to update snapshot when react reconciler updates.
    //send update to devtool.
  };

  // const fiber = reactConnect()();

  console.log('target ---> ', target);
  console.log(
    'target.__ATOMIC_DEVTOOLS_EXTENSION__ ---> ',
    target.__ATOMIC_DEVTOOLS_EXTENSION__
  );
  target.__ATOMIC_DEVTOOLS_EXTENSION__.getFiber = liftedOnCommitFiberRoot();

  target.postMessage(
    {
      action: 'testGetFiber',
      payload: { fiberRoot: 'fiber' },
    },
    '*'
  );
}
