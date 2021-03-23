import React, {
  createContext,
  useContext,
  useState,
  useDebugValue,
} from 'react';

import { atom, useAtom, SECRET_INTERNAL_getStoreContext } from 'jotai';

const AtomStateContext = createContext({});
const AtomUpdateContext = createContext('test');

function AtomicDebugger(props) {
  //get rootFiber from within debugger component
  // console.log('state -> ', document.getElementById('root')
  // ._reactRootContainer
  // ._internalRoot
  // .current
  // .stateNode.current)

  //Deeclareing state to build serializable atomState to send to devtool
  //setAtomState is consumed by our useAtom() wrapper useAtomicDevtools()
  //and atom() wrapper atomic()
  const [atomState, setAtomState] = useState({});

  //investigate when and if we need useEffect to avoid update warnings with rendering
  // useEffect(() => {
  //}, []);

  // TODO connect to dev tool to notify for state changes
  // consume provider atomic state
  // useMutableSource
  // iterate over atomic state provided by Provider
  // to get dependancy data from weakMap

  // console.log('atomState', atomState);

  //Get store context from Jotai Provider (replace with non-internal-secret method if possible)
  //Ideally aquire Provider context internally if possible

  const storeContext = SECRET_INTERNAL_getStoreContext();
  // console.log("storeContext", storeContext);

  //Get the current value of the store context which is understood to be the mutable source
  //Look into the difference between currentValue and currentValue2

  const storeMap = storeContext._currentValue[0];
  // console.log('storeMap', storeMap);

  //get key Symbols for mutable source
  const storeContextSymbols = Object.getOwnPropertySymbols(storeMap);
  // console.log("storeContextSymbols", storeContextSymbols);

  //get first symbol for Provider store in mutable source
  const storeSymbol = storeContextSymbols[0];
  // console.log("storeSymbol", storeSymbol);

  //Get store from mutable source
  const store = storeMap[storeSymbol];
  // console.log('store', store);

  //mutable source holds 'a' which is atomStore and 'm' which is mountedStore
  //get atomStore from Provider store
  const atomStore = store.a;
  //console.log("atomStore - > ", atomStore);

  //Create a serializable object of atom state to send to devtool
  const atomsToDevtool = {};

  //Iterating through atate of Atoms acculated through applications use of useAtomicDevtool() and atomic()
  //in order to aquire the atomState of each atom from WeakMap
  for (const [label, atom] of Object.entries(atomState)) {
    //Create copy of atom state per atom in Provider store

    atomsToDevtool[label] = { ...atomStore.get(atom) };
    //Array of atom dependancy labels

    const atomDeps = [];
    // iterate over Map of atom dependancies and push label to array

    atomsToDevtool[label].d.forEach((ref, dep) => {
      if (!atomsToDevtool[dep.debugLabel || dep.toString()]) {
        atomsToDevtool[dep.debugLabel || dep.toString()] = {
          ...atomStore.get(dep),
        };

        //assuming that there not deeply nested dependancies
        //check to see if true
        //stop on circular refs
        atomsToDevtool[dep.debugLabel || dep.toString()].d = [
          dep.debugLabel || dep.toString(),
        ];
      }

      atomDeps.push(dep.debugLabel || dep.toString());
    });

    //replace Map reference with serializable array of dependacies
    atomsToDevtool[label].d = atomDeps;
  }

  console.log('atomsToDevtool --> ', atomsToDevtool);
  return (
    //consumer
    // <AtomStateContext.Provider value={atomState}>
    <AtomUpdateContext.Provider value={setAtomState}>
      {props.children}
    </AtomUpdateContext.Provider>
    // </AtomStateContext.Provider>
  );
}

function useAtomicDevTool(atom, label) {
  //Use context provided by AtomicDebugger component to retrieve setAtomState()
  const setAtomState = useContext(AtomUpdateContext);

  //Update AtomicDebugger AtomState with a shallow copy of the atom used in application component.
  setAtomState(atomState => {
    const copy = { ...atomState };
    copy[label] = atom;
    return { ...copy };

    // Why doesn't this retain value??
    // atomState[label] = atom;
    // return atomState
  });

  //Set debug label key for natual language reference (Jotai uses 'atom + incremented value for labels internally)
  atom.debugLabel = label;

  //for React Devtools...
  useDebugValue(atom, () => label);

  //return useAtom to maintain functionality
  return useAtom(atom);
}

export {
  AtomicDebugger,
  AtomStateContext,
  AtomUpdateContext,
  useAtomicDevTool,
};
