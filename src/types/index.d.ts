
//Snapshot State(Atom(s)) taken from Atomic dev tool
export type snapshot = {
  contents: any;
  nodeDeps: string[];
  components: string[]
};

//Component Tree taken from Atomic dev tool
export type componentTree = {
  name: string;
  usedAtoms: string[];
  children: object[];
  // tag: number;
  // state: {};
  // props: {};
};

