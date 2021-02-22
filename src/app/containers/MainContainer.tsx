import React from 'react';
import SnapShotContainer from './SnapShotContainer';
import VisualContainer from './VisualContainer';

function MainContainer() {
  return (
    <div className="MainContainer">
      <VisualContainer />
      <SnapShotContainer />
    </div>
  );
}

export default MainContainer;
