import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedNodes as RCN, ConnectedNodesProvider } from '../src/index';

const App = () => {
  const node: React.CSSProperties = {
    backgroundColor: '#1864AB',
    color: '#fff',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    fontSize: 18,
    padding: 16,
    borderRadius: 16,
  };

  const stroke = {
    ['stroke.color']: '#444',
    ['stroke.width']: 2,
  };

  return (
    <ConnectedNodesProvider>
      <RCN.Container
        style={{
          backgroundColor: '#111',
          boxShadow: '12px 12px 32px #000',
          height: '60vh',
          padding: 100,
          margin: 100,
          border: '1px solid #111',
          borderRadius: 16,
          userSelect: 'none',
        }}
      >
        <RCN.Node _id={1} style={{ ...node, left: 700, top: 100 }}>
          Node 1
        </RCN.Node>

        <RCN.Node
          _id={2}
          style={{
            ...node,
            left: 400,
            top: 400,
          }}
        >
          Node 2
        </RCN.Node>

        <RCN.Node _id={3} style={{ ...node, left: 1000, top: 400 }}>
          Node 3
        </RCN.Node>

        <RCN.Node _id={4} style={{ ...node, left: 300, top: 700 }}>
          Node 4
        </RCN.Node>

        <RCN.Node _id={5} style={{ ...node, left: 500, top: 700 }}>
          Node 5
        </RCN.Node>

        <RCN.Node _id={6} style={{ ...node, left: 900, top: 700 }}>
          Node 6
        </RCN.Node>

        <RCN.Node _id={7} style={{ ...node, left: 1100, top: 700 }}>
          Node 7
        </RCN.Node>

        <RCN.Connector from={1} to={3} extra={stroke} />
        <RCN.Connector from={1} to={2} extra={stroke} />

        <RCN.Connector from={2} to={4} extra={stroke} />
        <RCN.Connector from={2} to={5} extra={stroke} />

        <RCN.Connector from={3} to={6} extra={stroke} />
        <RCN.Connector from={3} to={7} extra={stroke} />
      </RCN.Container>
    </ConnectedNodesProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
