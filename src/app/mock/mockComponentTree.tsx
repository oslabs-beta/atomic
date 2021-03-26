export const componentAtomTreeMock = {
  name: 'InnerProvider',
  tag: 0,
  atom: [],
  state: {},
  props: {},
  children: [
    {
      name: 'div',
      tag: 0,
      atom: [],
      state: {},
      props: { className: 'game' },
      children: [
        {
          name: 'h1',
          tag: 0,
          atom: [],
          state: {},
          props: {},
          children: [
            {
              name: '',
              tag: 0,
              atom: [],
              state: {},
              props: { innerText: 'x' },
              children: [],
            },
            {
              name: 'span',
              tag: 0,
              atom: [],
              state: {},
              props: {},
              children: [
                {
                  name: '',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: { innerText: 'o' },
                  children: [],
                },
              ],
            },
            {
              name: '',
              tag: 0,
              atom: [],
              state: {},
              props: { innerText: 'x' },
              children: [],
            },
            {
              name: 'span',
              tag: 0,
              atom: [],
              state: {},
              props: {},
              children: [
                {
                  name: '',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: { innerText: 'o' },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Status',
          tag: 0,
          atom: ['statusAtom', 'resetSquaresAtom'],
          state: {
            statusAtom: {
              values: { gameStatus: null },
              dependencies: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
            },
            resetSquaresAtom: {
              update: { reset: 'f () {}' },
              dependencies: ['squaresAtom'],
            },
          },
          props: {},
          children: [
            {
              name: 'div',
              tag: 0,
              atom: [],
              state: {},
              props: { className: 'status' },
              children: [
                {
                  name: 'div',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: { className: 'message' },
                  children: [
                    /*how to tie atom use as child, gameStatus atom value is being passed as child*/
                  ],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: { onClick: 'resetSquaresAtom' },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'div',
          tag: 0,
          atom: [],
          state: {},
          props: { className: 'board' },
          children: [
            {
              name: 'Squares',
              tag: 0,
              atom: ['selectSquaresAtom'],
              state: {
                selectSquaresAtom: {values: {
                  squares: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                  ],
                },
                update: { selectSquare: 'f () {}' },
                dependencies: ['squaresAtom', 'winnerAtom', 'nextValueAtom']}
              },
              props: {},
              children: [
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 0,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [
                    /*el from map as child?*/
                  ],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 1,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 2,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 3,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 4,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 5,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 6,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 7,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
                {
                  name: 'button',
                  tag: 0,
                  atom: [],
                  state: {},
                  props: {
                    key: 8,
                    className: 'square null',
                    onClick: 'selectSquare',
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'End',
      tag: 0,
      atom: ['windowSize', 'winnerAtom', "statusAtom"],
      state: {
        windowSize: { values: { width: 38, height: 185 }, dependencies: [] },
        winnerAtom: {
          values: { gameWinner: null },
          dependencies: ['squaresAtom'],
        },
        statusAtom: {
          values: { gameStatus: null },
          dependencies: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
        },
      },
      props: {},
      children: [
        /* conditionally rendered child? */
      ],
    },
  ],
};
