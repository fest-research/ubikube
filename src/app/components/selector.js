import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Tip from './tip'
import styles from './selector.scss';

export default class Selector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(event, index, value) {
    this.setState({
      value: value
    })
  }

  render() {
    // Render select list items
    var items = []
    var index = 0
    if(this.props.items) {
      for (var item of this.props.items) {
        items.push(<MenuItem key={index} value={index++} primaryText={item}/>)
      }
    }

    return <div style={{display: 'flex'}}>
    <SelectField className={styles.ukSelector}
                        floatingLabelText={this.props.label}
                        onChange={this._handleChange}
                        value={this.state.value}
                        disabled={false}>
      {items}
    </SelectField>
    <Tip text={this.props.tipText}/>
    </div>
  }
}
