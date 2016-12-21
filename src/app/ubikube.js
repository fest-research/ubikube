import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from './components/Button';
import Toolbar from './components/toolbar';

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider>
      <div>
        <Toolbar/>
        <Button/>
      </div>
    </MuiThemeProvider>
  }
}
