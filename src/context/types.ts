import { ConnectorProps } from '../components/Connector';
import { NodeProps } from '../components/Node';

export interface $Node<T extends HTMLElement> extends NodeProps {
  $el: T;
}

export interface $Connector extends ConnectorProps {
  $from?: $Node<HTMLElement>;
  $to?: $Node<HTMLElement>;
  $path?: SVGPathElement;
}
