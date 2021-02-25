/* eslint-disable no-console */

import reactConnect from './fiber';
import { findNodeByComponentName, Utils } from 'react-fiber-traverse';

const extensionID = 'mhjbagmpmekobfmiejlekbcbclmmpbki';
console.log('in index.ts');
console.log(reactConnect);

const fiber = reactConnect()();

console.log('index.ts SCOPE ---> ', window);

chrome.runtime.sendMessage(extensionID, {
  action: 'testGetFiber',
  payload: { fiberRoot: fiber },
});

/*
JOTAI STATE TO PRINTABLE
const atomToPrintable = (atom: AnyAtom) => atom.debugLabel || atom.toString()

const isAtom = (x: AnyAtom | symbol): x is AnyAtom => typeof x !== 'symbol'

const stateToPrintable = (state: State) =>
  Object.fromEntries(
    Array.from(state.m.entries()).map(([atom, [dependents]]) => {
      const atomState = state.a.get(atom) || ({} as AtomState)
      return [
        atomToPrintable(atom),
        {
          value: atomState.re || atomState.rp || atomState.wp || atomState.v,
          dependents: Array.from(dependents)
            .filter(isAtom)
            .map(atomToPrintable),
        },
      ]
    })
  )
*/
