import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';
import { ConnectorStrategy } from '../strategy/ConnectorStrategy';
import { $Connector, $Node } from './types';

export interface ConnectedNodesDevContext {
  setSvgGroup(el: SVGGElement): void;

  drawPaths(): void;
}

export const defaultConnectedNodesDevContext: ConnectedNodesDevContext = {
  setSvgGroup(_) {},
  drawPaths() {},
};

export const ConnectedNodesDevContext = createContext<ConnectedNodesDevContext>(
  defaultConnectedNodesDevContext
);

export interface ConnectedNodesDevProviderProps
  extends HTMLAttributes<HTMLElement> {
  $nodes: $Node<HTMLElement>[];
  $connectors: $Connector[];
  strategy: ConnectorStrategy;
}

export function ConnectedNodesDevProvider({
  children,
  $nodes,
  $connectors,
  strategy,
}: ConnectedNodesDevProviderProps) {
  // const { nodes, connectors, strategy } = useConnectedNodes();
  const [svgGroup, setSvgGroup] = useState<SVGGElement | null>(null);

  function drawPaths() {
    $connectors.forEach($c => {
      if (!$c.$from) {
        $c.$from = $nodes.find(n => n._id === $c.from);
      }

      if (!$c.$to) {
        $c.$to = $nodes.find(n => n._id === $c.to);
      }

      if ($c.$from && $c.$to && svgGroup) {
        if (strategy) strategy.drawConnector($c, svgGroup);
      }
    });
  }

  return (
    <ConnectedNodesDevContext.Provider value={{ setSvgGroup, drawPaths }}>
      {children}
    </ConnectedNodesDevContext.Provider>
  );
}

export const useConnectedNodesDev = () => useContext(ConnectedNodesDevContext);
