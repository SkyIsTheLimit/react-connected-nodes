import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { useConnectedNodes } from '../context/ConnectedNodesContext';
import { $Node } from '../context/types';

export interface NodeProps extends HTMLAttributes<HTMLElement> {
  _id: string | number;
}

export function Node({ _id, children, className, style, ...props }: NodeProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const { addNode, removeNode } = useConnectedNodes();

  useEffect(() => {
    let $node: $Node<HTMLDivElement>;

    if (divRef && divRef.current) {
      $node = {
        _id,
        children,
        className,
        ...props,
        $el: divRef.current,
      };

      addNode($node);
    }

    return () => {
      if ($node) removeNode($node);
    };
  }, [divRef, addNode, removeNode, _id, children, className, props]);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        cursor: 'move',
        display: 'inline-block',
        ...style,
      }}
      className={`node ${className || ''}`}
    >
      {children}
    </div>
  );
}
