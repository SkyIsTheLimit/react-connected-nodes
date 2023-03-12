import { $Connector } from '../context/types';

export interface ConnectorStrategy {
  drawConnector($connector: $Connector, parent: SVGGElement): void;
}
