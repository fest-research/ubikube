import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Selector from './components/selector/selector'
import Toolbar from './components/toolbar/toolbar';
import Input from './components/input/input';
import FlashDialog from './components/dialog/flashdialog';

import { list } from 'drivelist';
import { theme } from './themes/fjtheme';

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
    const drivelist = require('drivelist');

    drivelist.list((error, drives) => {
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
      advancedSection = <Paper zDepth={0}>
        <h2>Wireless network</h2>
        <Input hintText="SSID" tipText="Name of the wireless network."/>
        <Input hintText="Password" tipText="Password of the wireless network."/>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={theme}>
      <div className='uk-root'>
        <Toolbar title="Ubikube"/>
        <Paper className='uk-card'
         zDepth={0} children={this.props.children}>
          <form onSubmit={this._handleSubmit} className='uk-flex-container'>
            <h2 className='uk-card-header'>Setup</h2>
            <Selector label="Memory card"
                      tipText="Memory card to be flashed."
                      ref="memoryCardSelect"
                      items={this.state.drives}/>
            <Input hintText="Token" inputRef={node => this.tokenField = node}
                   tipText="Cluster's API server token."/>
            <Input hintText="Hostname" inputRef={node => this.hostnameField = node}
                   tipText="Hostname of the device which will use flashed memory card."/>
            {advancedSection}
            <FlatButton className='uk-advanced-button'
                        label={this.state.advancedLabel}
                        onClick={this._switchAdvancedSectionVisibility}
                        rippleColor="white" hoverColor="white"/>
            <RaisedButton className='uk-submit-button'
                          label="Flash"
                          type="submit" secondary={true}/>
          </form>
          <FlashDialog ref="flashDialog"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
