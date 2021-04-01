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
  //Declaring state to build serializable atomState to send to devtool
  //SetAtomState is consumed by our useAtom() wrapper useAtomicDevtools()
  const [usedAtoms, setUsedAtoms] = useState({});

  //State for Checking that there are changes to state before sending messages to Devtool.
  const [previousState, setPreviousState] = useState(null);

  //Get rootFiber from within debugger component.
  const fiberRoot = document.getElementById('root')._reactRootContainer
    ._internalRoot.current.stateNode.current;

  //? Send fiber to chrome.storage here?

  let jotaiProviderComponentStoreContext;

  //Skip first react render cycle.
  if (fiberRoot.child) {
    jotaiProviderComponentStoreContext =
      fiberRoot.child.child.memoizedState.memoizedState.current;

    //?Assume <Provider> Component is top level rendered in <App>?
    //TODO Make sure jotai provider is there.
    //TODO figure out provider-less mode.

    //Store Jotai state from provider context.
    const jotaiState = jotaiProviderComponentStoreContext[0];
    // console.log('jotaiState ---> ', jotaiState);

    //Get key Symbols for mutable source.
    const stateSymbolKeys = Object.getOwnPropertySymbols(jotaiState);
    // console.log('stateSymbolKeys ---> ', stateSymbolKeys);

    //Get first symbol for Provider state in mutable source.
    const stateSymbol = stateSymbolKeys[0];
    // console.log('stateSymbol ---> ', stateSymbol);

    //Get state from mutable source.
    const state = jotaiState[stateSymbol];
    // console.log('state ---> ', state);

    //Mutable source has keys 'a', which is atomStateMap and 'm', which is mountedMap.
    //https://github.com/pmndrs/jotai/blob/537d5b15ec3d7c0293db720c4007158fb32dec6f/src/core/vanilla.ts#L52-L58

    //Get atomStateMap from Provider state.
    const atomStateMap = state.a;
    // console.log('atomStateMap ---> ', atomStateMap);

    //Get mountedMap from Provider state.
    const mountedMap = state.m;
    // console.log('mountedMap ---> ', mountedMap);

    //Declare a store for mounted states per atom.
    const mountedStates = {};

    //Create a serializable object of atom state to send to devtool.
    const atomsToDevtool = {};

    //Iterating through Atoms accumulated in debugging application's use of useAtomicDevtool().
    //in order to acquire the atomState of each atom from atomStateMap (WeakMap).
    //https://github.com/pmndrs/jotai/blob/537d5b15ec3d7c0293db720c4007158fb32dec6f/src/core/vanilla.ts#L23-L31
    for (const [label, atom] of Object.entries(usedAtoms)) {
      atomsToDevtool[label] = { ...atomStateMap.get(atom) };
      mountedStates[label] = { ...mountedMap.get(atom) };
    }

    //
    /**
     * Recursively transverse readDependencies per atom atomsToDevtools and find missing atoms (declared outside of React Components).
     * Recursively transverse dependents in mountedStates to find missing atoms (declared outside of React components).
     * Acquire atomState and mountedState with found atoms.
     * @param {*} atom dependent or readDependency atom
     * @param {*} mapType string trigger to delegate which map to get the state, 'atomState' or 'mounted'
     */
    const traverseDeps = (atom, mapType) => {
      atom.d.forEach((ref, dep) => {
        let label = dep.debugLabel || dep.toString();
        let readDependency = null;
        let dependent = null;

        if (mapType === 'atomState') readDependency = atomsToDevtool[label];
        else if (mapType === 'mounted') dependent = mountedStates[label];

        if (readDependency === undefined || dependent === undefined) {
          if (mapType === 'atomState') {
            //
            readDependency = {
              ...atomStateMap.get(dep),
            };
            atomsToDevtool[label] = readDependency;
            traverseDeps(readDependency, mapType);
          }

          if (mapType === 'mounted') {
            dependent = {
              ...mountedMap.get(dep),
            };
            mountedStates[label] = dependent;
            traverseDeps(dependent, mapType);
          }
        }
      });
    };

    //Initialize recursive algorithm to find atoms for each atom initially stored in atomsToDevtools.
    for (const [_, atom] of Object.entries(atomsToDevtool)) {
      traverseDeps(atom, 'atomState');
      traverseDeps(atom, 'mounted');
    }

    //Serialize dependencies (read & mounted) per atom in atomsToDevtool for messaging.
    for (const [label, atom] of Object.entries(atomsToDevtool)) {
      //Array of atom dependant labels
      const mountedDeps = [];

      mountedStates[label].d.forEach(atom => {
        mountedDeps.push(atom.debugLabel || atom.toString());
      });

      //Array of atom readDependency labels
      const atomDeps = [];

      atom.d.forEach((ref, dep) => {
        atomDeps.push(dep.debugLabel || dep.toString());
      });

      //Formatted serializable object that is sent to devtool.
      atomsToDevtool[label] = {
        reference: atom.r,
        readDependencies: atomDeps,
        dependents: mountedDeps,
        value: atom.v,
      };
    }

    //Serialize state to send to devtool.
    const atomsToDevtoolString = JSON.stringify(atomsToDevtool);

    //TODO add try/catch for if devtool is installed and error messaging to client
    //TODO redeclare action types for messaging

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
  //Use context provided by AtomicDebugger component to retrieve setAtomState().
  const setUsedAtoms = useContext(AtomUpdateContext);

  //Update AtomicDebugger usedAtoms with a shallow copy of the atom used in application component.
  setUsedAtoms(atomState => {
    const copy = { ...atomState };
    copy[label] = atom;
    return { ...copy };

    //?Why doesn't this retain value??
    //atomState[label] = atom;
    //return atomState
  });

  //Set debug label key for natural language reference (Jotai uses 'atom + incremented value' for labels internally)
  atom.debugLabel = label;

  //for React Devtools...
  useDebugValue(atom, () => label);

  //Return the value of useAtom invoked to maintain functionality in Jotai application.
  return useAtom(atom);
}

export { AtomicDebugger, useAtomicDevtool };
