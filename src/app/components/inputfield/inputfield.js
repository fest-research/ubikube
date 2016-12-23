import React from 'react';
import TextField from 'material-ui/TextField';
import Tip from '../tip/tip'

import styles from './inputfield.scss';

export default class InputField extends React.Component {
  render() {
    return <div className={styles.ukInputField}>
             <TextField className={styles.ukTextField}
                        hintText={this.props.hintText}/>
             <Tip text={this.props.tipText}/>
           </div>
  }
}
