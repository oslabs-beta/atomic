import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import { componentAtomTreeMock } from '../../mock/mockComponentTree';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const data: TreeNode = componentAtomTreeMock;

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 30 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function ComponentTreeCopy({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('vertical');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#de638a" to="#d13164" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#202020" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {tree => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="#7c7c7c"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const widthFunc = (name: string) => {
                    let nodeLength = name.length;
                    if (nodeLength < 5) return nodeLength + 30;
                    if (nodeLength < 10) return nodeLength + 40;
                    return nodeLength + 70;
                  };
                  const width = widthFunc(node.data.name);
                  const height = 20;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="url('#links-gradient')"
                          rx={4}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill={node.data.atom.length ? '#7f5dc0' : '#1cb5c9'}
                          rx={4}
                          stroke={'black'}
                          strokeWidth={1}
                          strokeDasharray={0}
                          strokeOpacity={1}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={node.depth === 0 ? 12 : 11}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={
                          node.depth === 0
                            ? 'white'
                            : node.data.atom.length
                            ? 'white'
                            : 'black'
                        }
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

export default ComponentTreeCopy;
