import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Content from './Content';
import Button from './Button';
import TopBar from './AppBar';

export default class App extends React.Component {
  render() {
    return <MuiThemeProvider>
      <div>
        <TopBar/>
        <Button/>
        <Content/>
      </div>
    </MuiThemeProvider>
  }
}
