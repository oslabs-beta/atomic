// snapshot taken by atomic module
export type stateSnapshot = {
  filteredSnapshot: filteredSnapshot;
  componentAtomTree: componentAtomTree;
  indexDiff?: number;
};

// used for the filter state hook
export type stateSnapshotDiff = {
  filteredSnapshot?: filteredSnapshotDiff;
  componentAtomTree?: componentAtomTreeDiff;
  indexDiff?: number;
};

export type filteredSnapshot = {
  // key of atom name(s) with the value of an atom
  [atomName: string]: node;
};

export type filteredSnapshotDiff = {
  [atomName: string]: nodeDiff;
};

export type selectedTypes = {
  name: string;
};

// object of each atom
export type node = {
  // user defined node state
  contents: any;
  // current node is dependent on this array
  nodeDeps: string[];
};

export type nodeDiff = {
  contents?: any;
  nodeDeps?: string[] | string[][];
};

export type componentAtomTree = {
  children: object[];
  name: string;
  tag: number;
  atom: string[];
  state: {};
  props: {};
  // actualDuration: number;
  // treeBaseDuration: number;
  // wasSuspended: boolean;
};

export type componentAtomTreeDiff = {
  children: object[] | object[][]
  name: string | string[];
  tag: number | number[];
  atom: string[] | string[][];
  state: {} | {}[];
  props: {} | {}[];
  // actualDuration: number | number[];
  // treeBaseDuration: number | number[];
  // wasSuspended: boolean | boolean[];
};


export type atom = {
  [name: string]: any;
};