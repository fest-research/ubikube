import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import electron from 'electron';

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
    return <Toolbar className='uk-toolbar'>
             <ToolbarGroup firstChild={true}>
               <ToolbarTitle className='uk-toolbar-title'
                             text={this.props.title}/>
             </ToolbarGroup>
             <ToolbarGroup>
               <IconButton iconClassName='material-icons uk-toolbar-icon'
                           onClick={this._close}>close</IconButton>
             </ToolbarGroup>
           </Toolbar>
  }
}
