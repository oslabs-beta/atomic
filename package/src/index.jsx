import React, {
  createContext,
  useContext,
  useState,
  useDebugValue,
} from 'react';

import { useAtom } from 'jotai';

const AtomStateContext = createContext({});
const AtomUpdateContext = createContext('test');

// eslint-disable-next-line react/prop-types
function AtomicDebugger({ children }) {
  //declaring state to build serializable atomState to send to devtool
  //setAtomState is consumed by our useAtom() wrapper useAtomicDevtools()
  const [usedAtoms, setUsedAtoms] = useState({});

  //for checking that there are changes to state before sending messages to Devtool
  const [previousState, setPreviousState] = useState(null);

  // get rootFiber from within debugger component
  const fiberRoot = document.getElementById('root')._reactRootContainer
    ._internalRoot.current.stateNode.current;

  console.log('fiberRoot --->', fiberRoot);

  //chrome storage??

  let jotaiProviderComponentStoreContext;

  //Skip first react render cycle
  if (fiberRoot.child) {
    jotaiProviderComponentStoreContext =
      fiberRoot.child.child.memoizedState.memoizedState.current;

    console.log(
      'jotaiProviderComponentStoreContext ---> ',
      jotaiProviderComponentStoreContext
    );
    //Assume <Provider> Component is top level rendered in <App>
    //Make sure jotai provider is there.
    //figure out providerless mode

    //investigate when and if we need useEffect to avoid update warnings with rendering
    // useEffect(() => {
    //}, []);

    // TODO connect to dev tool to notify for state changes

    const jotaiState = jotaiProviderComponentStoreContext[0];
    console.log('jotaiState ---> ', jotaiState);

    //get key Symbols for mutable source
    const stateSymbolKeys = Object.getOwnPropertySymbols(jotaiState);
    console.log('stateSymbolKeys ---> ', stateSymbolKeys);

    //get first symbol for Provider state in mutable source
    const stateSymbol = stateSymbolKeys[0];
    console.log('stateSymbol ---> ', stateSymbol);

    //Get state from mutable source
    const state = jotaiState[stateSymbol];
    console.log('state ---> ', state);

    //mutable source holds 'a' which is atomState and 'm' which is mountedState
    //get atomState from Provider state
    const atomState = state.a;
    console.log('atomState ---> ', atomState);

    //get mountedState from Provider state
    const mountedState = state.m;
    console.log('mountedState ---> ', mountedState);

    const mountedStateToGetDependants = {};

    //Create a serializable object of atom state to send to devtool
    const atomsToDevtool = {};

    //Iterating through atate of Atoms acculated through applications use of useAtomicDevtool() and atomic()
    //in order to aquire the atomState of each atom from WeakMap
    for (const [label, atom] of Object.entries(usedAtoms)) {
      //Create copy of atom state per atom in Provider state
      atomsToDevtool[label] = { ...atomState.get(atom) };
    }

    //travers deps in atomsToDevtools and find missing atoms (global)
    const traverseDeps = (label, atom) => {
      atom.d.forEach((ref, dep) => {
        let dependantAtom = atomsToDevtool[dep.debugLabel || dep.toString()];
        if (!dependantAtom) {
          dependantAtom = {
            ...atomState.get(dep),
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
    // console.log('atomsToDevtool --- > ', atomsToDevtool);
    console.log(
      'mountedStateToGetDependants ---> ',
      mountedStateToGetDependants
    );

    for (const [label, atom] of Object.entries(usedAtoms)) {
      console.log('label ---> ', label);
      console.log('atom ---> ', atom);

      mountedStateToGetDependants[label] = { ...mountedState.get(atom) };
    }

    const traverseMountedDeps = (label, atom) => {
      atom.d.forEach((ref, dep) => {
        let dependantAtom =
          mountedStateToGetDependants[dep.debugLabel || dep.toString()];
        if (!dependantAtom) {
          dependantAtom = {
            ...mountedState.get(dep),
          };

          mountedStateToGetDependants[
            dep.debugLabel || dep.toString()
          ] = dependantAtom;
          label = dep.debugLabel || dep.toString();

          traverseMountedDeps(label, dependantAtom);
        }
      });
    };

    for (const [label, atom] of Object.entries(atomsToDevtool)) {
      traverseMountedDeps(label, atom);
    }

    for (const [label, atom] of Object.entries(atomsToDevtool)) {
      let mountedDeps = [];

      mountedStateToGetDependants[label]?.d.forEach(atom => {
        mountedDeps.push(atom.debugLabel || atom.toString());
      });

      //Array of atom dependancy labels
      const atomDeps = [];

      atom.d.forEach((ref, dep) => {
        atomDeps.push(dep.debugLabel || dep.toString());
      });

      //replace Map reference with serializable array of dependecies
      atom.d = atomDeps;

      atomsToDevtool[label] = {
        reference: atom.r,
        dependencies: atom.d,
        dependants: mountedDeps,
        value: atom.v,
      };
    }

    const atomsToDevtoolString = JSON.stringify(atomsToDevtool);
    console.log('atomsToDevtoolString --- > ', atomsToDevtoolString);

    let extension;

    extension = window.__ATOMIC_DEVTOOLS_EXTENSION__;

    if (previousState !== atomsToDevtoolString) {
      try {
        extension.sendMessageToContentScripts({
          action: 'TEST_FROM_DEBUGGER_COMPONENT',
          payload: { atomState: atomsToDevtoolString },
        });
      } catch (error) {
        console.error('error in debugger component ---> ', error);
      }
      setPreviousState(atomsToDevtoolString);
    }
  }

  return (
    <AtomUpdateContext.Provider value={setUsedAtoms}>
      {children}
    </AtomUpdateContext.Provider>
  );
}

function useAtomicDevtool(atom, label) {
  //Use context provided by AtomicDebugger component to retrieve setAtomState()
  const setUsedAtoms = useContext(AtomUpdateContext);

  //Update AtomicDebugger AtomState with a shallow copy of the atom used in application component.
  setUsedAtoms(atomState => {
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

  // useEffect(() => {
  let extension;

  extension = window.__ATOMIC_DEVTOOLS_EXTENSION__;

  try {
    // extension.sendMessageToContentScripts({
    //   action: 'TEST_FROM_WRAPPER',
    //   payload: 'from wrapper',
    // });
  } catch {}
  // }, [atom]);

  //return useAtom to maintain functionality
  return useAtom(atom);
}

export {
  AtomicDebugger,
  AtomStateContext,
  AtomUpdateContext,
  useAtomicDevtool,
};
