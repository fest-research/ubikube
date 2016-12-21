import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from './components/flashbutton';
import Toolbar from './components/toolbar';
import InputField from './components/inputfield'

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider>
      <div>
        <Toolbar title="Ubikube"/>
        <InputField/>
        <Button/>
      </div>
    </MuiThemeProvider>
  }
}
