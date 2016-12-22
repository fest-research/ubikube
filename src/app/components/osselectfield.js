import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './osselectfield.scss';

export default class OSSelectField extends React.Component {

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
    return <SelectField className={styles.ukOSSelectField}
                        floatingLabelText="Operating system"
                        onChange={this._handleChange}
                        value={this.state.value}
                        disabled={false}>
                        <MenuItem value={0} primaryText="Hypriot"/>
                          <MenuItem value={1} primaryText="Raspbian"/>

          </SelectField>
  }
}
