import React from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import getLinkComponent from '../ComponentGraph/getLinkComponent';

let snapshot: any[] = [
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
        'CompnoentGraph',
      ],
    },
  },
];

function AtomToComponent(atom: string) {
  let atomComponentData = {};
  let object = snapshot[0][atom];
  atomComponentData.name = atom;
  atomComponentData.components = [];
  object.components.map(item => {
    atomComponentData.components.push({ name: item });
  });
  console.log('atomComponentData', atomComponentData);
  console.log('object', object);
  return atomComponentData;
}

function AtomToDependents(atom): string {
  let atomDependentData = {};
  let object = snapshot[0][atom];
  atomDependentData.name = atom;
  atomDependentData.nodeDeps = [];
  object.nodeDeps.map(item => {
    atomDependentData.nodeDeps.push({ name: item });
  });
  console.log('atomDependentData', atomDependentData);
  return atomDependentData;
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
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#de638a" to="#d13164" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#202020" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, d => (d.isExpanded ? null : d.components))}
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
                    if (nodeLength < 10) return nodeLength + 45;
                    if (nodeLength < 20) return nodeLength + 90;
                    return nodeLength + 70;
                  };
                  const width = widthFunc(node.data.name);
                  const height = 20;

                  let top: number;
                  let left: number;

                  const [radialX, radialY] = pointRadial(node.x, node.y);
                  top = radialY;
                  left = radialX;

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <rect
                          height={height + 2}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="url('#links-gradient')"
                          rx={4}
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
                        fontSize={node.depth === 0 ? 12 : 11}
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
      </svg>
    </div>
  );
}

export default AtomToComponentNetwork;
