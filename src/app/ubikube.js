import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Selector from './components/selector/selector'
import Toolbar from './components/toolbar/toolbar';
import Input from './components/input/input';
import FlashDialog from './components/dialog/flashdialog';

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
      systems: []
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

    // Read values from form fields.
    let token = this.tokenField.getValue();
    let hostname = this.hostnameField.getValue();
    let memoryCard = this.refs.memoryCardSelect.getValue();

    this.refs.flashDialog.show(token, hostname, memoryCard);
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
        <Input hintText="SSID" tipText="Name of the wireless network."/>
        <Input hintText="Password" tipText="Password of the wireless network."/>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={theme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <Paper className={styles.ukCard} zDepth={0} children={this.props.children}>
          <form onSubmit={this._handleSubmit} className={styles.ukFlexContainer}>
            <h2 className={styles.ukCardHeader}>Setup</h2>
            <Selector label="Memory card"
                      tipText="Memory card to be flashed."
                      ref="memoryCardSelect"
                      items={this.state.drives}/>
            <Input hintText="Token" inputRef={node => this.tokenField = node}
                   tipText="Cluster's API server token."/>
            <Input hintText="Hostname" inputRef={node => this.hostnameField = node}
                   tipText="Hostname of the device which will use flashed memory card."/>
            {advancedSection}
            <FlatButton className={styles.ukShowAdvancedButton}
                        label={this.state.advancedLabel}
                        onClick={this._switchAdvancedSectionVisibility}
                        className={styles.ukAdvancedButton}
                        rippleColor="white" hoverColor="white"/>
            <RaisedButton className={styles.ukSubmitButton} label="Flash"
                          type="submit" secondary={true}/>
          </form>
          <FlashDialog ref="flashDialog"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
