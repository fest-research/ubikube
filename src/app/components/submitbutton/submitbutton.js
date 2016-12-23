import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './submitbutton.scss';

export default class SubmitButton extends React.Component {
  render() {
    return <RaisedButton className={styles.ukSubmitButton}
                         label={this.props.label}
                         type="submit"
                         secondary={true}/>
  }
}
