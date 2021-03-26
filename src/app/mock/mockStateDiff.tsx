export const curSnapMock = {
  statusAtom: {
    contents: 'Next Player: X',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ["End", "Status"]
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
    components: ["End"]
  },
  nextValueAtom: {
    contents: "O",
    nodeDeps: ['squaresAtom'],
    components: []
  },
  resetSquaresAtom: {
    contents: 0,
    nodeDeps: ['squaresAtom'],
    components: [ "Status"]
  },
  selectSquaresAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ["Squares"]
  },
  squaresAtom: {
    contents: [null, null, null, null, null, null, null, null, null],
    nodeDeps: [],
    components: []
  },
};

export const prevSnapMock = {
  statusAtom: {
    contents: 'Next Player: O',
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ["End", "Status"]
  },
  winnerAtom: {
    contents: null,
    nodeDeps: ['squaresAtom'],
    components: ["End"]
  },
  nextValueAtom: {
    contents: "X",
    nodeDeps: ['squaresAtom'],
    components: []
  },
  resetSquaresAtom: {
    contents: 1,
    nodeDeps: ['squaresAtom'],
    components: [ "Status"]
  },
  selectSquaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
    components: ["Squares"]
  },
  squaresAtom: {
    contents: ['X', null, null, 'X', null, null, 'O', null, null],
    nodeDeps: [],
    components: []
  },
};
