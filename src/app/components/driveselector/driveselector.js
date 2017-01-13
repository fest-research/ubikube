import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Tip from '../tip/tip'
import { list } from 'drivelist'

export default class DriveSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      drives: []
    };

    list((error, drives) => {
      drives.map((drive) => {
        // Display only non-system drives.
        if (!drive.system) {
          this.state.drives.push(`${drive.device} (${drive.description})`);
        }
      });

      // Select first drive by default.
      if (this.state.drives.length > 0) {
        this.setState({value: this.state.drives[0]})
      } else {
        this.setState({value: null})
      }
    });

    this._handleChange = this._handleChange.bind(this)
  }

  getValue() {
    return this.state.value;
  }

  _handleChange(event, index, value) {
    this.setState({value: value})
  }

  render() {
    let items = [];
    var index = 0;
    for (var item of this.state.drives) {
      items.push(<MenuItem key={index} value={item} primaryText={item}/>);
      index++;
    }

    return <div className='uk-selector-container'>
             <SelectField className='uk-selector'
                          floatingLabelText={this.props.label}
                          onChange={this._handleChange}
                          value={this.state.value}
                          disabled={false}
                          fullWidth={true}>
               {items}
             </SelectField>
             <Tip text={this.props.tipText}/>
           </div>
  }
}
