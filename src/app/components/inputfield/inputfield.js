import React from 'react';
import TextField from 'material-ui/TextField';
import Tip from '../tip/tip'

import styles from './inputfield.scss';

export default class InputField extends React.Component {
  render() {
    return <div className={styles.ukInputField}>
             <TextField className={styles.ukTextField}
                        hintText={this.props.hintText}
                        ref={this.props.inputRef}/>
             <Tip text={this.props.tipText}/>
           </div>
  }
}
