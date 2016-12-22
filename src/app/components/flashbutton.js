import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './flasbutton.scss';

export default class FlashButton extends React.Component {
  render() {
    return <RaisedButton className={styles.ukFlashButton}
                         label={this.props.label}
                         secondary={true}
                         onClick={this.handleClick} />
  }

  handleClick() {
    alert("Action!");
  }
}
