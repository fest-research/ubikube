import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from './components/flashbutton';
import Toolbar from './components/toolbar';
import InputField from './components/inputfield'
import ContentCard from './components/contentcard'

import {fjTheme} from './fjtheme';
import styles from './main.scss';

export default class Ubikube extends React.Component {
  render() {
    return <MuiThemeProvider muiTheme={fjTheme}>
      <div className={styles.ukRoot}>
        <Toolbar title="Ubikube"/>
        <ContentCard>
          <InputField title="os"/>
          <InputField title="token"/>
          <InputField title="hostname"/>
          <InputField title="sd card"/>
          <InputField title="wifi"/>
          <Button label="Flash"/>
        </ContentCard>
      </div>
    </MuiThemeProvider>
  }
}
