import React from 'react';

import Content from './Content';

export default class App extends React.Component {
  render() {
    return <div>
      <h1>Electron React Webpack HMR Example</h1>
      <Content />
    </div>
  }
}
