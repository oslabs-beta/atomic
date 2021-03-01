export const curSnapMock = {
  statusAtom: {
    contents: 'Next Player: X',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  nextValueAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  resetSquaresAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  selectSquaresAtom: {
    contents: null,
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
  },
  squaresAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
    nodeDeps: [],
  },
};

export const prevSnapMock = {
  statusAtom: {
    contents: 'Next Player: O',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  nextValueAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  resetSquaresAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
  },
  selectSquaresAtom: {
    contents: null,
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
  },
  squaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: [],
  },
};
