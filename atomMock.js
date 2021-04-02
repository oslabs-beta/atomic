const one = {
  statusAtom: {
    reference: 1,
    dependencies: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    dependants: [],
    value: 'Next player: X',
  },
  resetSquaresAtom: {
    reference: 0,
    dependencies: ['resetSquaresAtom'],
    dependants: ['resetSquaresAtom'],
    value: null,
  },
  selectSquareAtom: {
    reference: 1,
    dependencies: ['squaresAtom'],
    dependants: [],
    value: [null, null, null, null, null, null, null, null, null],
  },
  winnerAtom: {
    reference: 1,
    dependencies: ['squaresAtom'],
    dependants: ['statusAtom'],
    value: null,
  },
  squaresAtom: {
    reference: 0,
    dependencies: ['squaresAtom'],
    dependants: [
      'squaresAtom',
      'winnerAtom',
      'nextValueAtom',
      'statusAtom',
      'selectSquareAtom',
    ],
    value: [null, null, null, null, null, null, null, null, null],
  },
  nextValueAtom: {
    reference: 1,
    dependencies: ['squaresAtom'],
    dependants: ['statusAtom'],
    value: 'X',
  },;
};
