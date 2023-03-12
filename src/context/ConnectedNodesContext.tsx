import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useState,
} from 'react';
import { ConnectorStrategy } from '../strategy/ConnectorStrategy';
import { DefaultConnectorStrategy } from '../strategy/DefaultConnectorStrategy';
import { ConnectedNodesDevProvider } from './ConnectedNodesDevContext';
import { $Connector, $Node } from './types';

export interface ConnectedNodesContext {
  strategy?: ConnectorStrategy;
  setStrategy(strategy: ConnectorStrategy): void;

  nodes: $Node<HTMLElement>[];
  addNode<T extends HTMLElement>(node: $Node<T>): void;
  removeNode<T extends HTMLElement>(node: $Node<T>): void;

  connectors: $Connector[];
  addConnector(connector: $Connector): void;
  removeConnector(connector: $Connector): void;
}

const defaultConnectedNodesContext: ConnectedNodesContext = {
  setStrategy(_) {},

  nodes: [],
  addNode(_) {},
  removeNode(_) {},

  connectors: [],
  addConnector(_) {},
  removeConnector(_) {},
};

export const ConnectedNodesContext = createContext<ConnectedNodesContext>(
  defaultConnectedNodesContext
);

export function ConnectedNodesProvider({
  children,
}: HTMLAttributes<HTMLElement>) {
  const nodes: $Node<HTMLElement>[] = [],
    connectors: $Connector[] = [];
  const [strategy, setStrategy] = useState<ConnectorStrategy>(
    new DefaultConnectorStrategy()
  );

  function addNode<T extends HTMLElement>(node: $Node<T>) {
    nodes.push(node);
  }

  function removeNode<T extends HTMLElement>(node: $Node<T>) {
    const index = nodes.indexOf(node);

    if (index !== -1) {
      nodes.splice(index, 1);
    }
  }

  function addConnector(connector: $Connector) {
    connectors.push(connector);
  }

  function removeConnector(connector: $Connector) {
    const index = connectors.indexOf(connector);

    if (index !== -1) {
      connectors.splice(index, 1);
    }
  }

  return (
    <ConnectedNodesContext.Provider
      value={{
        strategy,
        setStrategy,

        nodes,
        addNode,
        removeNode,

        connectors,
        addConnector,
        removeConnector,
      }}
    >
      <ConnectedNodesDevProvider
        $nodes={nodes}
        $connectors={connectors}
        strategy={strategy}
      >
        {children}
      </ConnectedNodesDevProvider>
    </ConnectedNodesContext.Provider>
  );
}

export const useConnectedNodes = () => useContext(ConnectedNodesContext);
