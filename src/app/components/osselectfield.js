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

    console.log(this.state)
    console.log(this);;
  }

_handleChange(event, index, value) {
  console.log("sadsa")
  console.log(index)
  console.log(value)
  console.log(this.state)

  console.log(this)

  // no access - 'this'?

  this.state.value = value
}

handleChange = (event, index, value) => this.state.value = value; // this.setState({value});

  render() {
    return <SelectField className={styles.ukOSSelectField}
                        floatingLabelText="Operating system"
                        onChange={this.handleChange}
                        value={this.state.value}
                        disabled={false}>
                        <MenuItem value={0} primaryText="Hypriot"/>
                          <MenuItem value={1} primaryText="Raspbian"/>

          </SelectField>
  }
}
