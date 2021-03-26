import React, {
  createContext,
  useContext,
  useState,
  useDebugValue,
  useEffect,
} from 'react';

import { useAtom, SECRET_INTERNAL_getStoreContext } from 'jotai';

const AtomStateContext = createContext({});
const AtomUpdateContext = createContext('test');

// eslint-disable-next-line react/prop-types
function AtomicDebugger({ children }) {
  //get rootFiber from within debugger component
  // console.log('state -> ', document.getElementById('root')
  // ._reactRootContainer
  // ._internalRoot
  // .current
  // .stateNode.current)

  useEffect(() => {
    let extension;

    extension = window.__ATOMIC_DEVTOOLS_EXTENSION__;

    console.log('window in AtomicDebugger is ---> ', window);
    console.log(
      'window.__ATOMIC_DEVTOOLS_EXTENSION__ in AtomicDebugger is ---> ',
      window.__ATOMIC_DEVTOOLS_EXTENSION__
    );
    console.log(
      'window.__REACT_CONTEXT_DEVTOOL_GLOBAL_HOOK in AtomicDebugger is ---> ',
      window.__REACT_CONTEXT_DEVTOOL_GLOBAL_HOOK
    );

    try {
      extension();
    } catch {}
  }, []);

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
  console.log('atomStore - > ', atomStore);

  //Create a serializable object of atom state to send to devtool
  const atomsToDevtool = {};

  //Iterating through atate of Atoms acculated through applications use of useAtomicDevtool() and atomic()
  //in order to aquire the atomState of each atom from WeakMap
  for (const [label, atom] of Object.entries(atomState)) {
    //Create copy of atom state per atom in Provider store
    atomsToDevtool[label] = { ...atomStore.get(atom) };
  }

  //travers deps in atomsToDevtools and find missing atoms (global)
  const traverseDeps = (label, atom) => {
    atom.d.forEach((ref, dep) => {
      let dependantAtom = atomsToDevtool[dep.debugLabel || dep.toString()];
      if (!dependantAtom) {
        dependantAtom = {
          ...atomStore.get(dep),
        };

        atomsToDevtool[dep.debugLabel || dep.toString()] = dependantAtom;
        label = dep.debugLabel || dep.toString();

        traverseDeps(label, dependantAtom);
      }
    });
  };

  for (const [label, atom] of Object.entries(atomsToDevtool)) {
    traverseDeps(label, atom);
  }

  // iterate over Map of atom dependancies and push label to array

  console.log('atomsToDevtool --- > ', atomsToDevtool);

  for (const [label, atom] of Object.entries(atomsToDevtool)) {
    //Array of atom dependancy labels
    const atomDeps = [];

    atom.d.forEach((ref, dep) => {
      atomDeps.push(dep.debugLabel || dep.toString());
    });
    atom.d = atomDeps;
  }

  console.log('atomsToDevtool --- > ', atomsToDevtool);
  //replace Map reference with serializable array of dependacies

  const atomsToDevtoolString = JSON.stringify(atomsToDevtool);
  // console.log('atomsToDevtoolString --- > ', atomsToDevtoolString);
  console.log('atomsToDevtoolString --- > ', atomsToDevtoolString);

  return (
    <AtomUpdateContext.Provider value={setAtomState}>
      {children}
    </AtomUpdateContext.Provider>
  );
}

function useAtomicDevtool(atom, label) {
  useEffect(() => {
    let extension;

    extension = window.__ATOMIC_DEVTOOLS_EXTENSION__;

    console.log('window in AtomicDebugger is ---> ', window);
    console.log(
      'window.__ATOMIC_DEVTOOLS_EXTENSION__ in AtomicDebugger is ---> ',
      window.__ATOMIC_DEVTOOLS_EXTENSION__
    );

    try {
      extension();
    } catch {}
  }, []);
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
  useAtomicDevtool,
};
