
//Snapshot State(Atom(s)) taken from Atomic dev tool
export type snapshot = {
  contents: any;
  nodeDeps: string[];
};

//Component Tree taken from Atomic dev tool
export type componentTree = {
  children: object[];
  name: string;
  tag: number;
  atom: string[];
  state: {};
  props: {};
};

