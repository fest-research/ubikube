import React from 'react';

export default class Content extends React.Component {
  render() {
    return <ul>
      <li>Dupa {process.versions.node}</li>
      <li>Test {process.versions.chrome}</li>
      <li>Electron {process.versions.electron}</li>
    </ul>
  }
}
