import React from 'react';
import TextField from 'material-ui/TextField';

import styles from './inputfield.scss';

export default class InputField extends React.Component {
  render() {
    return <div className={styles.ukInputField}>
      <TextField className={styles.ukTextField} hintText={this.props.hintText}/>
      <div className={styles.ukTip}>{this.props.tipText}</div>
    </div>
  }
} 