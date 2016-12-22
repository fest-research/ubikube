import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import electron from 'electron';

import styles from './toolbar.scss';

export default class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this._close = this._close.bind(this)
  }

  _close() {
    let window = electron.remote.getCurrentWindow();
    window.close();
  }
  
  render() {
    return <Toolbar className={styles.ukToolbar}>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle className={styles.ukToolbarTitle} text={this.props.title}/>
      </ToolbarGroup>
      <ToolbarGroup>
        <IconButton iconClassName={'material-icons ' + styles.ukToolbarIcon}
                    onClick={this._close}>close</IconButton>
      </ToolbarGroup>
    </Toolbar>
  }
}
