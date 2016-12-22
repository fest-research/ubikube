import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import FlashButton from './components/flashbutton';
import Toolbar from './components/toolbar';

import {fjTheme} from './fjtheme';
import styles from './main.scss';

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <TextField className={styles.ukTextField} hintText="os" underlineShow={false}/>
          <Divider />
          <TextField className={styles.ukTextField} hintText="sd card" underlineShow={false}/>
          <Divider />

          <TextField className={styles.ukTextField} hintText="token" underlineShow={false}/>
          <Divider />
          <TextField className={styles.ukTextField} hintText="hostname" underlineShow={false}/>
          <Divider />

          <FlatButton label="Advanced" style={{alignSelf: 'flex-start', marginTop: '16px', marginBottom: '16px'}}/>
          <Paper zDepth={0} children={this.props.children}>
            <TextField className={styles.ukTextField} hintText="username" underlineShow={false}/>
            <Divider />
            <TextField className={styles.ukTextField} hintText="password" underlineShow={false}/>
            <Divider />
          </Paper>

          <FlashButton label="Flash"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
