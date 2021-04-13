//Snapshot State(Atom(s)) taken from Atomic dev tool
export type Snapshot = {
  [key: string]: snapshotValue;
};

//Individual snapshot object
export type SnapshotValue = {
  value: any;
  readDependencies: string[];
  dependents: string[];
  components: string[];
};

//Snapshot history for context API
export type SnapshotHistoryContext = {
  snapshotHistory: Snapshot[] | [];
  setSnapshotHistory?: React.Dispatch<React.SetStateAction<Snapshot[]>>;
};

//Snapshot index for context API
export type SnapshotIndexContext = {
  snapshotIndex: number;
  setSnapshotIndex?: React.Dispatch<React.SetStateAction<number>>;
};

//Component Tree taken from Atomic dev tool
export type ComponentTree = {
  name: string;
  usedAtoms: string[];
  children: object[];
  // tag: number;
  // state: { [key: string]: any };
  // props: Record<string, unknown>;
};

//Component tree history for context API
export type ComponentTreeHistoryContext = {
  componentTreeHistory: ComponentTree[] | [];
  setComponentTreeHistory?: React.Dispatch<
    React.SetStateAction<ComponentTree[]>
  >;
};

//Atom Network features: atom-to-component, atom-to-dependent, atom-to- readDependencies
//Component Graph feature:
export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  atomName?: string;
};

//These types are portConnection betwee
type portActions =
  | 'DEV_INITIALIZED'
  | 'RECORD_ATOM_SNAPSHOT'
  | 'RECORD_COMPONENT_TREE'
  | 'CONNECTED_TO_DEVTOOL';
export type windowActions = 'RECORD_ATOM_SNAPSHOT' | 'RECORD_FIBER';

export type portMessage = {
  action: portActions;
  payload?: any;
  tabId?: any;
};

export type windowMessage = {
  source?: string;
  action: windowActions;
  payload?: any;
};
