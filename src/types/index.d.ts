//Snapshot State(Atom(s)) taken from Atomic dev tool
export type Snapshot = {
  [key: string]: snapshotValue;
};

//Individual snapshot object
export type SnapshotValue = {
  contents: any;
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
  children: object[];
  name: string;
  tag: number;
  atom: string[];
  state: { [key: string]: any };
  props: Record<string, unknown>;
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
