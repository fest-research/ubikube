import React from 'react';
import TextField from 'material-ui/TextField';
import HelpIcon from './helpicon'

export default class InputField extends React.Component {
  render() {
    return <div>
    <TextField hintText="Hint Text"/>
    <HelpIcon/>
    <br/>
    </div>
  }
}
