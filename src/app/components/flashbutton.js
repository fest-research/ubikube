import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FlashButton extends React.Component {
  render() {
    return <RaisedButton label={this.props.label} onClick={this.handleClick} />
  }

  handleClick() {
    alert("Action!");
  }
}
