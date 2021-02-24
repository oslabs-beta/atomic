import React from 'react';
import SnapShotContainer from './SnapShotContainer';
import VisualContainer from './VisualContainer';

function MainContainer() {
  return (
    <div className="mainContainer">
      <SnapShotContainer />
      <VisualContainer />
    </div>
  );
}

export default MainContainer;
