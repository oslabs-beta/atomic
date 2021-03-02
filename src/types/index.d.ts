// snapshot taken by recoilize module
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
  // key of atom name with the value of an atom
  [atomName: string]: node;
};

export type filteredSnapshotDiff = {
  [atomName: string]: nodeDiff;
};
export type selectedTypes = {
  [name: string]: string;
};

// object of either atom
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
