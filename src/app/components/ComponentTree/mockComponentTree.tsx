export const componentAtomTreeMock = {
  children: [
    {
      children: [],
      name: 'Level 1-A',
      tag: 0,
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-A',
          tag: 0,
          atom: ['atom1'],
          state: 1,
        },
        {
          children: [
            {
              children: [],
              name: 'Level 3-A',
              tag: 0,
              atom: ['atom1'],
              state: 0,
            },
            {
              children: [
                {
                  children: [],
                  name: 'Level 4-A',
                  tag: 0,
                  atom: ['atom1'],
                  state: 'x',
                },
              ],
              name: 'Level 3-B',
              tag: 0,
              atom: ['atom1'],
              state: "[3, 4, 52, 45]",
            },
          ],
          name: 'Level 2-B',
          tag: 0,
          atom: ['atom1'],
          state: 45,
        },
      ],
      name: 'Level 1-B',
      tag: 0,
      atom: ['atom1'],
      state: 0,
    },
    {
      children: [
        {
          children: [],
          name: 'Level 2-C',
          tag: 0,
          atom: ['atom1'],
          state: 0,
        },
        {
          children: [],
          name: 'Level 2-D',
          tag: 0,
          atom: ['atom1'],
          state: [3, 4, 52, 45],
        },
      ],
      name: 'Level 1-C',
      tag: 0,
      atom: ['atom1'],
      state: 0,
    },
  ],
  name: 'APP',
  tag: 0,
  atom: ['atom1'],
  state: 0,
};
