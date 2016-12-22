import React from 'react';
import TextField from 'material-ui/TextField';
import HelpIcon from './helpicon'

export default class InputField extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
    <TextField hintText={this.props.title}/>
    <HelpIcon/>
    <br/>
    </div>
  }
}
