/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    __ATOMIC_DEVTOOLS_EXTENSION__: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

// import { buildNodeTree, getProviderState } from './resq';
// put something that doesnt work with scoping

export function fiberHelper(target: Window) {
  let providerState;

  const liftedOnCommitFiberRoot = (): (() => void) => {
    return () => {
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

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

            // providerState = getProviderState(fiberRoot.current);

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

  const sendMessageToContentScripts = (message: any) => {
    //This message goes from inspected application to content-scripts
    target.postMessage(message, '*');
  };

  target.__ATOMIC_DEVTOOLS_EXTENSION__.getFiber = liftedOnCommitFiberRoot();
  target.__ATOMIC_DEVTOOLS_EXTENSION__.sendMessageToContentScripts = sendMessageToContentScripts;
}
