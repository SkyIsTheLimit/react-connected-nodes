import { $Connector } from '../context/types';
import { ConnectorStrategy } from './ConnectorStrategy';

const bounds = (el: HTMLElement) => ({
  x: el.offsetLeft,
  y: el.offsetTop,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

function dAttr({ $from, $to }: $Connector) {
  if (!$from || !$to) return '';

  const b1 = bounds($from.$el);
  const b2 = bounds($to.$el);

  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };

  if (Math.abs(b1.x - b2.x) > Math.abs(b1.y - b2.y)) {
    if (b1.x < b2.x) {
      start.x = b1.x + b1.width;
      start.y = b1.y + b1.height / 2;

      end.x = b2.x;
      end.y = b2.y + b2.height / 2;
    } else {
      start.x = b1.x;
      start.y = b1.y + b1.height / 2;

      end.x = b2.x + b2.width;
      end.y = b2.y + b2.height / 2;
    }
  } else {
    if (b1.y < b2.y) {
      start.x = b1.x + b1.width / 2;
      start.y = b1.y + b1.height;

      end.x = b2.x + b2.width / 2;
      end.y = b2.y;
    } else {
      start.x = b1.x + b1.width / 2;
      start.y = b1.y;

      end.x = b2.x + b2.width / 2;
      end.y = b2.y + b2.height;
    }
  }

  return `M${start.x} ${start.y} A25 0 0 0 0 ${end.x} ${end.y}`;
}

export class DefaultConnectorStrategy implements ConnectorStrategy {
  $connectors: $Connector[] = [];

  createPathForConnector($connector: $Connector) {
    console.log('Extra', $connector.extra);
    const $path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    $path.setAttribute(
      'd',
      $connector.$from && $connector.$to ? dAttr($connector) : ''
    );
    $path.setAttribute(
      'stroke',
      $connector.extra && $connector.extra['stroke.color']
        ? `${$connector.extra['stroke.color']}`
        : '#3399DD'
    );
    $path.setAttribute(
      'stroke-width',
      $connector.extra && $connector.extra['stroke.width']
        ? `${$connector.extra['stroke.width']}`
        : `6`
    );

    return $path;
  }

  createNewConnector($connector: $Connector, parent: SVGGElement): $Connector {
    if ($connector.$from && $connector.$to) {
      const $path = this.createPathForConnector($connector);
      $connector.$path = $path;

      if (parent) {
        parent.appendChild($path);
      }

      this.$connectors.push($connector);
    }

    return $connector;
  }

  findExistingConnectors({ $from, $to }: $Connector) {
    return this.$connectors.find(
      path =>
        path.$from &&
        $from &&
        path.$from._id === $from._id &&
        path.$to &&
        $to &&
        path.$to._id === $to._id
    );
  }

  drawConnector($connector: $Connector, parent: SVGGElement) {
    const $connector_ =
      this.findExistingConnectors($connector) ||
      this.createNewConnector($connector, parent);

    if (!$connector_.$path) {
      $connector_.$path = this.createPathForConnector($connector_);
    }

    $connector_.$path.setAttribute('d', dAttr($connector_));
  }
}
