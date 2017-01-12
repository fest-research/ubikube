import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Tip from '../tip/tip'

export default class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this._handleChange = this._handleChange.bind(this)
  }

  getValue() {
    return this.state.value;
  }

  _handleChange(event, index, value) {
    this.setState({
      value: value
    })
  }

  render() {
    var items = [];
    var index = 0;
    if(this.props.items) {
      for (var item of this.props.items) {
        items.push(<MenuItem key={index} value={item} primaryText={item}/>);
        index++;
      }
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
