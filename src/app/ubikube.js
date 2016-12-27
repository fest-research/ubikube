import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Selector from './components/selector/selector'
import Toolbar from './components/toolbar/toolbar';
import InputField from './components/inputfield/inputfield';

import {listAvailableDrives} from './scripts/drivelist';

import {theme} from './themes/fjtheme';
import styles from './ubikube.scss';

export default class Ubikube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
      advancedLabel: 'Show more options',
      drives: [],

    };

    this._switchAdvancedSectionVisibility = this._switchAdvancedSectionVisibility.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._initDrives();
  }

  _switchAdvancedSectionVisibility() {
    this.setState({
      showAdvanced: !this.state.showAdvanced,
      advancedLabel: this.state.advancedLabel === 'Show more options' ? 'Show less options' : 'Show more options'
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    console.log(this.hostnameField.getValue());
    console.log(this.tokenField.getValue());
    console.log(this.refs.memoryCardSelect.getValue());

    alert("Submit!")
  }

  _initDrives() {
    // Load listAvailableDrives of available drives
    listAvailableDrives((error, drives) => {
      if (error) {
        throw error;
      }

      drives.map((drive) => {
        this.state.drives.push(`${drive.device} (${drive.description})`);
      });

      this.setState(this.state)
    });
  }

  render() {
    const showAdvanced = this.state.showAdvanced;
    let advancedSection;

    if (showAdvanced) {
      advancedSection = <Paper className={styles.ukMoreOptionsCard} zDepth={0}>
        <h2>Wireless network</h2>
        <InputField hintText="SSID" tipText="Name of the wireless network."/>
        <InputField hintText="Password" tipText="Password of the wireless network."/>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={theme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <h2 className={styles.ukCardHeader}>Setup</h2>
          <form onSubmit={this._handleSubmit} className={styles.ukFlexContainer}>
            <Selector label="Memory card"
                      tipText="Memory card to be flashed."
                      ref="memoryCardSelect"
                      items={this.state.drives}/>
            <InputField hintText="Token" inputRef={node => this.tokenField = node}
                        tipText="Cluster's API server token."/>
            <InputField hintText="Hostname" inputRef={node => this.hostnameField = node}
                        tipText="Hostname of the device which will use flashed memory card."/>
            {advancedSection}
            <div className={styles.ukButtons}>
              <RaisedButton label={this.state.advancedLabel}
                            onClick={this._switchAdvancedSectionVisibility}
                            className={styles.ukAdvancedButton}/>
              <div className={styles.ukDivider}/>
              <RaisedButton className={styles.ukSubmitButton} label="Flash"
                            type="submit" secondary={true}/>
            </div>
          </form>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
