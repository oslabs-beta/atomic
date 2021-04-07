//Snapshot State(Atom(s)) taken from Atomic dev tool
export type snapshot = {
  contents: any;
  readDependencies: string[];
  dependents: string[];
  components: string[];
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

//Atom Network features: atom-to-component, atom-to-dependent, atom-to- readDependencies
//Component Graph
export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  atomName?: string;
};