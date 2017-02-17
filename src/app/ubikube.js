import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import DriveSelector from './components/driveselector/driveselector'
import Toolbar from './components/toolbar/toolbar'
import Input from './components/input/input'
import ProgressDialog from './components/progressdialog/progressdialog'

import {list} from 'drivelist'
import {mainTheme} from './themes'

export default class Ubikube extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdvanced: false,
      advancedLabel: 'Show more options',
      drives: [],
      systems: [],
      isFlashEnabled: false
    }

    this.iotAPIServerAddr = "104.155.11.172";
    this.iotAPIServerPort = "8085";

    this._switchAdvancedSectionVisibility = this._switchAdvancedSectionVisibility.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._onHostnameChange = this._onHostnameChange.bind(this)
  }

  _switchAdvancedSectionVisibility() {
    this.setState({
      showAdvanced: !this.state.showAdvanced,
      advancedLabel: this.state.advancedLabel === 'Show more options' ? 'Show less options' : 'Show more options'
    })
  }

  _handleSubmit(e) {
    let ssid = this.ssidField ? this.ssidField.getValue() : ''
    let password = this.passwordField ? this.passwordField.getValue() : ''

    this.iotAPIServerAddr = this.IOTServerIPField ? this.IOTServerIPField.getValue() : this.iotAPIServerAddr
    this.iotAPIServerPort = this.IOTPortField ? this.IOTPortField.getValue() : this.iotAPIServerPort

    e.preventDefault()
    this.refs.progressDialog.show(this.tokenField.getValue(),
      this.hostnameField.getValue(), this.refs.memoryCardSelect.getValue(), ssid, password,
      this.iotAPIServerAddr, this.iotAPIServerPort)
  }

  _onHostnameChange(e, newValue) {
    this.setState({
      isFlashEnabled: newValue.length > 0
    })
  }

  render() {
    const showAdvanced = this.state.showAdvanced
    let advancedSection

    if (showAdvanced) {
      advancedSection = <Paper zDepth={0}>
        <h2>Wireless network</h2>
        <Input hintText="SSID" tipText="Name of the wireless network."
               inputRef={node => this.ssidField = node}/>
        <Input hintText="Password" tipText="Password of the wireless network."
               inputRef={node => this.passwordField = node}/>
        <h2>IoT server details</h2>
        <Input hintText="IP address" tipText="IP address of the IoT server devices will be connecting to."
               inputRef={node => this.IOTServerIPField = node} defaultValue={this.iotAPIServerAddr}/>
        <Input hintText="Port number" tipText="Port number of the IoT server."
               inputRef={node => this.IOTPortField = node} defaultValue={this.iotAPIServerPort}/>
      </Paper>
    }

    return <MuiThemeProvider muiTheme={mainTheme}>
      <div className='uk-root'>
        <Toolbar title="Device Setup"/>
        <Paper className='uk-card'
               zDepth={0}
               children={this.props.children}>
          <form onSubmit={this._handleSubmit}
                className='uk-flex-container'>
            <DriveSelector label="Memory card"
                           tipText="Memory card to be flashed."
                           ref="memoryCardSelect"/>
            <Input hintText="Device registration code"
                   inputRef={node => this.tokenField = node}
                   tipText="You can find this code printed on the device."/>
            <Input hintText="Device name"
                   onChange={this._onHostnameChange}
                   inputRef={node => this.hostnameField = node}
                   tipText="Name to easily identify the device."/>
            {advancedSection}
            <FlatButton className='uk-advanced-button'
                        label={this.state.advancedLabel}
                        onClick={this._switchAdvancedSectionVisibility}
                        rippleColor="white"
                        hoverColor="white"/>
            <RaisedButton className='uk-submit-button'
                          label="Flash"
                          type="submit"
                          disabled={!this.state.isFlashEnabled}
                          secondary={true}/>
          </form>
          <ProgressDialog ref="progressDialog"/>
        </Paper>
      </div>
    </MuiThemeProvider>
  }
}
