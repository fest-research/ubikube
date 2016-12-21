import React from 'react';

require('./content.scss');

export default class Content extends React.Component {
  render() {
    return <ul>
      <li className="content">Node {process.versions.node}</li>
      <li>Chrome {process.versions.chrome}</li>
      <li>Electron {process.versions.electron}</li>
    </ul>
  }
}
