/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}
const payload = 'test';

export default (): (() => void) => {
  return () => {
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    console.log('devTools --> ', devTools);

    // window.postMessage(
    //   {
    //     action: 'test',
    //     payload,
    //   },
    //   '*'
    // );

    const reactInstance = devTools ? devTools.renderers.get(1) : null;

    console.log('reactInstance --> ', reactInstance);

    const fiberRoot = devTools.getFiberRoots(1).values().next().value;

    console.log('fiberRoot --> ', fiberRoot);

    const fiber = fiberRoot.current;

    console.log('fiber --> ', fiber);

    //traverse fiber generate snapshot. {} //reactTime tree generator to get object //reatime getHooks to get atomName useState
    //traverse fiber to get custom ATOMIC HOOK {atoms information} useAtomic(atom, 'name of atom') //useDebuglabel(string) defaults 'atom1, atom2 ... atomX'
    //send to devtool
    //monkey-patch react hook to update snapshot when react reconciler updates.
    //send update to devtool.
  };
};
