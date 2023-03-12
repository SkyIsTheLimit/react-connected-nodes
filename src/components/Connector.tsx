import React, { HTMLAttributes, useEffect } from 'react';
import { useConnectedNodes } from '../context/ConnectedNodesContext';
import { useConnectedNodesDev } from '../context/ConnectedNodesDevContext';
import { $Connector } from '../context/types';

export interface ConnectorProps extends HTMLAttributes<HTMLElement> {
  from: string | number;
  to: string | number;
  extra?: Record<string, string | number>;
}

export function Connector({ from, to, extra }: ConnectorProps) {
  const { addConnector, removeConnector } = useConnectedNodes();
  const { drawPaths } = useConnectedNodesDev();

  useEffect(() => {
    const connector: $Connector = { from, to, extra: extra || {} };

    if (from && to) {
      addConnector(connector);
    }

    drawPaths();

    return () => {
      if (from && to) {
        removeConnector(connector);
        drawPaths();
      }
    };
  }, [addConnector, removeConnector, from, to, extra, drawPaths]);

  return <></>;
}
