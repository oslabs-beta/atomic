import React from 'react';
import SnapShotContainer from './SnapShotContainer';
import VisualContainer from './VisualContainer';

const MainContainer: React.FC = () => {
  return (
    <div className="mainContainer">
      <VisualContainer />
      <SnapShotContainer />
    </div>
  );
};

export default MainContainer;
