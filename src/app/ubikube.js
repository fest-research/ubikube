import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import FlashButton from './components/flashbutton';
import Toolbar from './components/toolbar';
import Tip from './components/tip'

import {fjTheme} from './fjtheme';
import styles from './main.scss';

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <div>
            <TextField className={styles.ukTextField} hintText="Memory card" underlineShow={true}/>
            <Tip text="Memory card to be flashed."/>
          </div>
          <div>
            <TextField className={styles.ukTextField} hintText="Operating system" underlineShow={true}/>
            <Tip text="Operating system to be flashed on memory card."/>
          </div>
          <div>
            <TextField className={styles.ukTextField} hintText="Token" underlineShow={true}/>
            <Tip text="Cluster's API server token."/>
          </div>
          <div>
            <TextField className={styles.ukTextField} hintText="Hostname" underlineShow={true}/>
            <Tip text="Hostname of the device which will use flashed memory card."/>
          </div>
          <FlatButton label="Advanced" style={{alignSelf: 'flex-start', marginTop: '16px', marginBottom: '16px'}}/>
          <Paper zDepth={0} children={this.props.children}>
            <div>
              <TextField className={styles.ukTextField} hintText="Username" underlineShow={true}/>
              <Tip text="Name of the user to authenticate."/>
            </div>
            <div>
              <TextField className={styles.ukTextField} hintText="Password" underlineShow={true}/>
              <Tip text="Password of the user to authenticate."/>
            </div>
          </Paper>

          <FlashButton label="Flash"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
