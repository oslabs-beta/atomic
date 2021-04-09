
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

//These types are portConnection betwee
type portActions = 'DEV_INITIALIZED' | 'RECORD_ATOM_SNAPSHOT' | 'RECORD_COMPONENT_TREE' | 'CONNECTED_TO_DEVTOOL';
export type windowActions = 'ATOMS_FROM_DEBUGGER_COMPONENT' | 'FIBER_FROM_APP'

export type portMessage = {
  action: portActions;
  payload: any;
};

export type windowMessage = {
  action: windowActions;
  payload: any;
};