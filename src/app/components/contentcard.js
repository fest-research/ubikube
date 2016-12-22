import React from 'react';
import Paper from 'material-ui/Paper';

import styles from './contentcard.scss';

export default class ContentCard extends React.Component {
  render() {
    return <Paper className={styles.ukCard} zDepth={1} children={this.props.children}/>
  }
}