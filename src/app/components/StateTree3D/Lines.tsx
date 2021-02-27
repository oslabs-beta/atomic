import React from 'react';
import Line from './Line';

function Lines(): JSX.Element {
  return (
    <>
      {/* component to component */}
      <Line defaultStart={[-2, 0, -5]} defaultEnd={[0, 0, -8]} />
      <Line defaultStart={[0, 0, -8]} defaultEnd={[2, 0, -5]} />
      <Line defaultStart={[-2, 0, -5]} defaultEnd={[-4, 0, -2]} />
      <Line defaultStart={[-2, 0, -5]} defaultEnd={[0, 0, -2]} />
      <Line defaultStart={[4, 0, -2]} defaultEnd={[2, 0, -5]} />
      <Line defaultStart={[0, 0, -2]} defaultEnd={[2, 0, 0]} />
      <Line defaultStart={[0, 0, -2]} defaultEnd={[-2, 0, 0]} />
      <Line defaultStart={[-2, 0, 0]} defaultEnd={[0, 0, 2]} />
      <Line defaultStart={[-2, 0, 0]} defaultEnd={[-4, 0, 2]} />
      {/* component to atom */}
      <Line defaultStart={[0, 4, -4]} defaultEnd={[-2, 0, -5]} />
      <Line defaultStart={[0, 4, -4]} defaultEnd={[4, 0, -2]} />
      <Line defaultStart={[2, 4, -2]} defaultEnd={[-2, 0, 0]} />
      <Line defaultStart={[2, 4, -2]} defaultEnd={[4, 0, -2]} />
    </>
  );
}

export default Lines;
