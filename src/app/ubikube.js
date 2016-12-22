import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from './components/flashbutton';
import Toolbar from './components/toolbar';
import InputField from './components/inputfield'
import Card from './components/card'

import {fjTheme} from './fjtheme';
import styles from './main.scss';

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Card>
          <InputField/>
          <Button/>
        </Card>
      </div>
    </MuiThemeProvider>
  }
}
