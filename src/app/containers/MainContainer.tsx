import React from 'react';

import SnapshotContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';

function MainContainer(): JSX.Element {
  return (
    <div className="mainContainer">
      <SnapshotContainer />
      <VisualContainer />
    </div>
  );
}

export default MainContainer;
