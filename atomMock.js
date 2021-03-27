const one = {
  statusAtom: {
    r: 1,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
  },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, null, null, null, null, null],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 0,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, null, null, null, null, null],
  },
  nextValueAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: 'X' },
};
const two = {
  statusAtom: {
    r: 2,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: O',
  },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 2,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, 'X', null, null, null, null],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 1,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, null, null, 'X', null, null, null, null],
  },
  nextValueAtom: { r: 2, nodeDeps: ['squaresAtom'], contents: 'O' },
};
const three = {
  statusAtom: {
    r: 3,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
  },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 3,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', null, null, null, null],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 2,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', null, null, null, null],
  },
  nextValueAtom: { r: 3, nodeDeps: ['squaresAtom'], contents: 'X' },
};
const four = {
  statusAtom: {
    r: 4,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: O',
  },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 4,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', 'X', null, null, null],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 3,
    nodeDeps: ['squaresAtom'],
    contents: [null, null, 'O', null, 'X', 'X', null, null, null],
  },
  nextValueAtom: { r: 4, nodeDeps: ['squaresAtom'], contents: 'O' },
};
const five = {
  statusAtom: {
    r: 5,
    nodeDeps: ['winnerAtom', 'squaresAtom', 'nextValueAtom'],
    contents: 'Next player: X',
  },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', null, 'X', 'X', null, null, null],
  },
  winnerAtom: { r: 1, nodeDeps: ['squaresAtom'], contents: null },
  squaresAtom: {
    r: 4,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', null, 'X', 'X', null, null, null],
  },
  nextValueAtom: { r: 5, nodeDeps: ['squaresAtom'], contents: 'X' },
};
const six = {
  statusAtom: { r: 6, nodeDeps: ['winnerAtom'], contents: 'Winner: X' },
  resetSquaresAtom: { r: 0, nodeDeps: ['resetSquaresAtom'], contents: null },
  selectSquareAtom: {
    r: 6,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', 'X', 'X', 'X', null, null, null],
  },
  winnerAtom: { r: 2, nodeDeps: ['squaresAtom'], contents: 'X' },
  squaresAtom: {
    r: 5,
    nodeDeps: ['squaresAtom'],
    contents: [null, 'O', 'O', 'X', 'X', 'X', null, null, null],
  },
};
