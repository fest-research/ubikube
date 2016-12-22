import React from 'react';
import AppBar from 'material-ui/AppBar';

import styles from './toolbar.scss';

export default class Toolbar extends React.Component {
  render() {
    return <AppBar className={styles.ukToolbar}
                   title={this.props.title}
                   zDepth={1}
                   showMenuIconButton={false}/>
  }
}
