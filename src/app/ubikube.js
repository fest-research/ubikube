import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import FlashButton from './components/flashbutton';
import Toolbar from './components/toolbar';
import Tip from './components/tip'
import OSSelectField from './components/osselectfield'
import SDSelectField from './components/sdselectfield'
import InputField from './components/inputfield';

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

  _handleSubmit() {
    alert("Submit!")
  }

  render() {
    const showAdvanced = this.state.showAdvanced;
    let advancedSection;

    if (showAdvanced) {
      advancedSection = <Paper zDepth={0}>
        <h3 style={{paddingLeft: '16px'}}>Wireless network setup</h3>
        <InputField hintText="SSID" tipText="Name of the wireless network."/>
        <InputField hintText="Password" tipText="Password of the wireless network."/>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <h1 style={{paddingLeft: '16px'}}>Image setup</h1>
          <form onSubmit={this._handleSubmit}>
            <SDSelectField/>
            <OSSelectField/>
            <InputField hintText="Token" tipText="Cluster's API server token."/>
            <InputField hintText="Hostname" tipText="Hostname of the device which will use flashed memory card."/>
            {advancedSection}
            <FlatButton label={this.state.advancedLabel} className={styles.ukAdvancedButton}
                        hoverColor="white" rippleColor="white"
                        onClick={this._switchAdvancedSectionVisiblity}/>
            <FlashButton label="Flash"/>

          </form>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
