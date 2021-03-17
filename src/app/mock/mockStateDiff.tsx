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
    contents: "O",
    nodeDeps: ['squaresAtom'],
  },
  resetSquaresAtom: {
    contents: 0,
    nodeDeps: ['squaresAtom'],
  },
  selectSquaresAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
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
    contents: "X",
    nodeDeps: ['squaresAtom'],
  },
  resetSquaresAtom: {
    contents: 1,
    nodeDeps: ['squaresAtom'],
  },
  selectSquaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
  },
  squaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: [],
  },
};
