import React from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import getLinkComponent from '../ComponentGraph/getLinkComponent';
import { Zoom } from '@visx/zoom';
import { snapshot } from '../../../types';

let snapshotData: any[] = [
  {
    statusAtom: {
      contents: 'Next Player: X',
      nodeDeps: ['squaresAtom', 'winnerAtom', 'nextValueAtom'],
      components: [
        'End',
        'Status',
        'AtomNetwork',
        'ComponentGraph',
        'NavBar',
        'CompnoentGraph14235',
      ],
    },
  },
];

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 15.62,
  translateY: 55.59,
  skewX: 0,
  skewY: 0,
};

function AtomToComponent(atom: string) {
  let atomComponentData: any = {};
  let object: snapshot = snapshotData[0][atom];
  atomComponentData.name = atom;
  atomComponentData.components = [];
  object.components.map(item => {
    atomComponentData.components.push({ name: item });
  });
  console.log('atomComponentData', atomComponentData);
  console.log('object', object);
  return atomComponentData;
}

const data = AtomToComponent('statusAtom');

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function AtomToComponentNetwork({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const layout = 'polar';
  const linkType = 'line';

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;
  origin = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  sizeWidth = 2 * Math.PI;
  sizeHeight = Math.min(innerWidth, innerHeight) / 2;

  const LinkComponent = getLinkComponent({ layout, linkType });

  return totalWidth < 10 ? null : (
    <div>
      <Zoom
        width={totalWidth}
        height={totalHeight}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        transformMatrix={initialTransform}
      >
        {zoom => (
          <svg width={totalWidth} height={totalHeight}>
            <LinearGradient id="links-gradient" from="#de638a" to="#d13164" />
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="#202020"
            />
            <g transform={zoom.toString()}>
              <Group top={margin.top} left={margin.left}>
                <Tree
                  root={hierarchy(data, d =>
                    d.isExpanded ? null : d.components
                  )}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) =>
                    (a.parent === b.parent ? 0.55 : 0.5) / a.depth
                  }
                >
                  {tree => (
                    <Group top={origin.y} left={origin.x}>
                      {tree.links().map((link, i) => (
                        <LinkComponent
                          key={i}
                          data={link}
                          stroke="#7c7c7c"
                          strokeWidth="1"
                          fill="none"
                        />
                      ))}

                      {tree.descendants().map((node, key) => {
                        const widthFunc = (name: string) => {
                          let nodeLength = name.length;
                          if (nodeLength < 5) return nodeLength + 30;
                          if (nodeLength < 10) return nodeLength + 50;
                          if (nodeLength < 15) return nodeLength + 100;
                          if (nodeLength < 20) return nodeLength + 127;
                          return nodeLength + 145;
                        };
                        const width = widthFunc(node.data.name);
                        const height = 25;

                        let top: number;
                        let left: number;

                        const [radialX, radialY] = pointRadial(node.x, node.y);
                        top = radialY;
                        left = radialX;

                        const radiusFunc = (name: string) => {
                          let nodeLength = name.length;
                          if (nodeLength < 5) return nodeLength + 20;
                          if (nodeLength < 10) return nodeLength + 25;
                          if (nodeLength < 15) return nodeLength + 35;
                          if (nodeLength < 20) return nodeLength + 50;
                          return nodeLength + 70;
                        };
                        const radius = radiusFunc(node.data.name);

                        return (
                          <Group top={top} left={left} key={key}>
                            {node.depth === 0 && (
                              <circle
                                fill="url('#links-gradient')"
                                r={radius}
                              />
                            )}
                            {node.depth !== 0 && (
                              <rect
                                height={height}
                                width={width}
                                y={-height / 2}
                                x={-width / 2}
                                fill="#7f5dc0"
                                rx={4}
                                stroke={'black'}
                                strokeWidth={1}
                                strokeDasharray={0}
                                strokeOpacity={1}
                              />
                            )}
                            <text
                              dy=".33em"
                              fontSize={12}
                              fontFamily="Arial"
                              textAnchor="middle"
                              style={{
                                pointerEvents: 'none',
                                fontWeight: 'bold',
                              }}
                              fill={'white'}
                            >
                              {node.data.name}
                            </text>
                          </Group>
                        );
                      })}
                    </Group>
                  )}
                </Tree>
              </Group>
            </g>
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
            />
          </svg>
        )}
      </Zoom>
    </div>
  );
}

export default AtomToComponentNetwork;
