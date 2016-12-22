import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import FlashButton from './components/flashbutton';
import Toolbar from './components/toolbar';
import Tip from './components/tip'
import OSSelectField from './components/osselectfield'

import {fjTheme} from './fjtheme';
import styles from './main.scss';

export default class Ubikube extends React.Component {
  constructor(props) {
    super(props);
    this._switchAdvancedSectionVisiblity = this._switchAdvancedSectionVisiblity.bind(this)
    this.state = {showAdvanced: false, advancedLabel: 'More'};
  }

  _switchAdvancedSectionVisiblity() {
    this.setState({
      showAdvanced: !this.state.showAdvanced,
      advancedLabel: this.state.advancedLabel === 'More' ? 'Less' : 'More',
    });
  }

  render() {
    const showAdvanced = this.state.showAdvanced;
    let advancedSection;

    if (showAdvanced) {
      advancedSection = <Paper zDepth={0}>
        <h3 style={{paddingLeft: '16px'}}>Wireless network setup</h3>
        <div>
          <TextField className={styles.ukTextField} hintText="SSID"/>
          <Tip text="Name of the wireless network."/>
        </div>
        <div>
          <TextField className={styles.ukTextField} hintText="Password"/>
          <Tip text="Password of the wireless network."/>
        </div>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <h1 style={{paddingLeft: '16px'}}>Image setup</h1>
          <div>
            <TextField className={styles.ukTextField} hintText="Memory card"/>
            <Tip text="Memory card to be flashed."/>
          </div>
          <div>
            <OSSelectField/>
            <Tip text="Operating system to be flashed on memory card."/>
          </div>
          <div>
            <TextField className={styles.ukTextField} hintText="Token"/>
            <Tip text="Cluster's API server token."/>
          </div>
          <div>
            <TextField className={styles.ukTextField} hintText="Hostname"/>
            <Tip text="Hostname of the device which will use flashed memory card."/>
          </div>

          {advancedSection}
          <FlatButton label={this.state.advancedLabel} className={styles.ukAdvancedButton}
                      hoverColor="white" rippleColor="white"
                      onClick={this._switchAdvancedSectionVisiblity}/>

          <FlashButton label="Flash"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
