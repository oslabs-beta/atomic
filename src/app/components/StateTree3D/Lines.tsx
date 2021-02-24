import React from 'react';
import Line from './Line';

function Lines() {
  return (
    <>
      <Line defaultStart={[-100, -100, 0]} defaultEnd={[0, 100, 0]} />
    </>
  );
}

export default Lines;
