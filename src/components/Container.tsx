import React, {
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useConnectedNodesDev } from '../context/ConnectedNodesDevContext';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ children, className, style }: ContainerProps) {
  const { setSvgGroup, drawPaths } = useConnectedNodesDev();
  const svgGroupRef = useRef<SVGGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (svgGroupRef && svgGroupRef.current) {
      setSvgGroup(svgGroupRef.current);
    }
  }, [svgGroupRef, setSvgGroup]);

  function initiateDragging(e: MouseEvent) {
    setIsDragging(true);
    setTarget((e.target as HTMLElement).closest('.node') as HTMLElement);
  }

  function performDragging(e: MouseEvent) {
    if (isDragging) {
      if (target) {
        target.style.left = `${target.offsetLeft + e.movementX}px`;
        target.style.top = `${target.offsetTop + e.movementY}px`;
        target.style.right = 'unset';
        target.style.bottom = 'unset';
      }

      drawPaths();
    }
  }

  function finishDragging(_: MouseEvent) {
    setIsDragging(false);
    setTarget(null);
  }

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      className={className}
      onMouseDown={initiateDragging}
      onMouseMove={performDragging}
      onMouseUp={finishDragging}
      onMouseLeave={finishDragging}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
      >
        <g ref={svgGroupRef}></g>
      </svg>
      {children}
    </div>
  );
}
