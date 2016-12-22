import React from 'react';
import Paper from 'material-ui/Paper';

import cardStyle from './card.scss';

export default class Card extends React.Component {
  render() {
    return <Paper className={cardStyle.ukCard} zDepth={1} children={this.props.children}/>
  }
}