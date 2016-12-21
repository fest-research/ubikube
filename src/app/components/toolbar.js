import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class Toolbar extends React.Component {
constructor(props) {
  super(props)
}

  render() {
    return <AppBar title={this.props.title}/>
  }
}
