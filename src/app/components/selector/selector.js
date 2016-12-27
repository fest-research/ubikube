import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Tip from '../tip/tip'
import styles from './selector.scss';

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
    // Render items, that can be selected
    var items = [];
    var index = 0;
    if(this.props.items) {
      for (var item of this.props.items) {
        items.push(<MenuItem key={index} value={item} primaryText={item}/>);
        index++;
      }
    }

    return <div className={styles.ukSelectorContainer}>
             <SelectField className={styles.ukSelector}
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
