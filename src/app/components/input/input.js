import React from 'react';
import TextField from 'material-ui/TextField';
import Tip from '../tip/tip'

import styles from './input.scss';

export default class Input extends React.Component {
  render() {
    return <div className={styles.ukInput}>
             <TextField className={styles.ukTextField}
                        hintText={this.props.hintText}
                        fullWidth={true}
                        ref={this.props.inputRef}/>
             <Tip text={this.props.tipText}/>
           </div>
  }
}
