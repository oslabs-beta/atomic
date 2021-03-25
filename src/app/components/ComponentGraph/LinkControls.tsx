import React from 'react';
// Font size of the Controls label and Dropdowns
const controlStyles = {
  fontSize: '12px',
  padding: '10px',
};

const dropDownStyle = {
  margin: '0.5em',
  fontSize: '12px',
  borderRadius: '4px',
  backgroundColor: '#242529',
  color: 'white',
  padding: '2px',
};

type Props = {
  layout: string;
  orientation: string;
  linkType: string;
  stepPercent: number;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
  setOrientation: React.Dispatch<React.SetStateAction<string>>;
  setLinkType: React.Dispatch<React.SetStateAction<string>>;
  setStepPercent: React.Dispatch<React.SetStateAction<number>>;
};

function LinkControls({
  layout,
  orientation,
  linkType,
  stepPercent,
  setLayout,
  setOrientation,
  setLinkType,
  setStepPercent,
}: Props) {
  return (
    <div style={controlStyles}>
      {/* Layout selection */}
      <label>Layout:</label>
      <select
        onClick={e => e.stopPropagation()}
        onChange={e => setLayout(e.target.value)}
        value={layout}
        style={dropDownStyle}
      >
        <option value="cartesian">Cartesian</option>
        <option value="polar">Polar</option>
      </select>

      {/* Orientation selection- disabled when polar layout selected */}
      <label>Orientation:</label>
      <select
        onClick={e => e.stopPropagation()}
        onChange={e => setOrientation(e.target.value)}
        value={orientation}
        disabled={layout === 'polar'}
        style={dropDownStyle}
      >
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>

      {/* Link selections. */}
      <label>Link:</label>
      <select
        onClick={e => e.stopPropagation()}
        onChange={e => setLinkType(e.target.value)}
        value={linkType}
        style={dropDownStyle}
      >
        <option value="diagonal">Diagonal</option>
        <option value="step">Step</option>
        <option value="line">Line</option>
      </select>
      {/* Step option slider */}
      {linkType === 'step' && layout !== 'polar' && (
        <>
          <label>Step:</label>
          <input
            onClick={e => e.stopPropagation()}
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={e => setStepPercent(Number(e.target.value))}
            value={stepPercent}
            disabled={linkType !== 'step' || layout === 'polar'}
            className="slider"
          />
        </>
      )}
    </div>
  );
}

export default LinkControls;
