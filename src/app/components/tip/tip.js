import React from 'react';

import styles from './tip.scss';

export default class Tip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className={styles.ukTip}>{this.props.text}</div>
  }
}
