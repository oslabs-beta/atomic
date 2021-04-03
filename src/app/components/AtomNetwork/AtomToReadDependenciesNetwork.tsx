import React, { useContext, useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import getLinkComponent from '../ComponentGraph/getLinkComponent';
import { Zoom } from '@visx/zoom';
import { snapshot } from '../../../types';
import { snapshotHistoryContext, snapshotIndexContext } from '../App';

const initialTransform = {
  scaleX: 0.9,
  scaleY: 0.9,
  translateX: 20,
  translateY: 10,
  skewX: 0,
  skewY: 0,
};

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  atomName?: string;
};

function AtomToReadDependenciesNetwork({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  atomName,
}: LinkTypesProps) {
  const { snapshotHistory } = useContext<any>(snapshotHistoryContext);
  const { snapshotIndex } = useContext<any>(snapshotIndexContext);
  const [arrowRadius, setArrowRadius] = useState(0);
  const atomNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  function AtomToReadDependencies(atom: string | undefined) {
    const atomReadDependencies: any = {};
    let object: snapshot;

    if (!atom) return;
    if (!snapshotHistory[snapshotIndex][atom]) {
      object = snapshotHistory[snapshotIndex][atomNamesArray[0]];
      atomReadDependencies.name = atomNamesArray[0];
    } else {
      object = snapshotHistory[snapshotIndex][atom];
      atomReadDependencies.name = atom;
    }

    atomReadDependencies.nodeDeps = [];

    object.readDependencies.map(item => {
      atomReadDependencies.nodeDeps.push({ name: item });
    });

    return atomReadDependencies;
  }

  const data = AtomToReadDependencies(atomName);

  const layout = 'polar';
  const linkType = 'line';

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;
  console.log({ atomName });

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

  const arrowxRef = () => {

    if (arrowRadius < 25) return arrowRadius - 3;
    if (arrowRadius < 31) return arrowRadius - 7;
    if (arrowRadius < 36) return arrowRadius - 8;
    if (arrowRadius < 41) return arrowRadius - 13;
    if (arrowRadius < 46) return arrowRadius - 15;

    if (arrowRadius < 51) return arrowRadius - 17;
    if (arrowRadius < 56) return arrowRadius - 19;
    if (arrowRadius < 61) return arrowRadius - 21;
    if (arrowRadius < 66) return arrowRadius - 23;
    if (arrowRadius < 71) return arrowRadius - 25;
    if (arrowRadius < 76) return arrowRadius - 27;

    return arrowRadius - 50;
  };

  // useEffect(() => console.log('arrowRadius: ', arrowRadius), [arrowRadius]);

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
            <LinearGradient id="atom-gradient" from="#de638a" to="#d13164" />
              <LinearGradient
                id="dependent-gradient"
                from="#41b69c"
                to="#2d806d"
              />
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
        
                refX={arrowxRef()}
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c7c7c" />
              </marker>
            </defs>
            ;
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
                    d.isExpanded ? null : d.nodeDeps
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
                          strokeWidth="3"
                          fill="none"
                          markerStart="url(#arrow)"
                        />
                      ))}

                      {tree.descendants().map((node, key) => {
                        

                        let top: number;
                        let left: number;

                        const [radialX, radialY] = pointRadial(node.x, node.y);
                        top = radialY;
                        left = radialX;

                        const radiusFunc = (name: string) => {
                          const nodeLength = name.length;
                          if (nodeLength < 5) return nodeLength + 20;
                          if (nodeLength < 10) return nodeLength + 25;
                          if (nodeLength < 15) return nodeLength + 40;
                          if (nodeLength < 20) return nodeLength + 50;
                          return nodeLength * 4;
                        };
                        const radius = radiusFunc(node.data.name);

                        console.log('radius: ', radius);
                        console.log('arrowRadius: ', arrowRadius);

                        if (node.depth === 0) setArrowRadius(radius);

                        return (
                          <Group top={top} left={left} key={key}>
                            {node.depth === 0 && (
                              <circle fill="url('#atom-gradient')" r={radius} />
                            )}
                            {node.depth !== 0 && (
                              <circle
                                r={radius}
                                fill={"url('#dependent-gradient')"}
                              />
                            )}
                            <text
                              dy=".33em"
                              fontSize={13}
                              fontFamily="Arial"
                              textAnchor="middle"
                              style={{
                                pointerEvents: 'none',
                                fontWeight: 'bold',
                              }}
                              fill={'#e6e6e6'}
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

export default AtomToReadDependenciesNetwork;
