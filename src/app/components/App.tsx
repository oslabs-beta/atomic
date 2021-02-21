import React from 'react';
import { softShadows } from '@react-three/drei';
import StateTree from './StateTree';

function App() {
  softShadows();
  return (
    <>
      <StateTree />
    </>
  );
}

export default App;
