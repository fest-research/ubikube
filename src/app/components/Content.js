import React from 'react';

export default class Content extends React.Component {
  render() {
    return <ul>
      <li>Node {process.versions.node}</li>
      <li>Chrome {process.versions.chrome}</li>
      <li>Electron {process.versions.electron}</li>
    </ul>
  }
}
