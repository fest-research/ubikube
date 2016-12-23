import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Tip from './tip'
import styles from './sdselectfield.scss';

export default class SDSelectField extends React.Component {

  constructor() {
    super()

    this.state = {
      value: null
    }

    this._handleChange = this._handleChange.bind(this)
  }

_handleChange(event, index, value) {
  this.setState({
    value: value
  })
}

  render() {
    return <div style={{display: 'flex'}}>
      <SelectField className={styles.ukSDSelectField}
                          floatingLabelText="Memory card"
                          onChange={this._handleChange}
                          value={this.state.value}
                          disabled={false}>
                          <MenuItem value={0} primaryText="/dev/usb1"/>
                          <MenuItem value={1} primaryText="/dev/usb2"/>
            </SelectField>
      <Tip text={this.props.tipText}/>
    </div>

  }
}
