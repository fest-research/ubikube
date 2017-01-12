import React from 'react';

export default class Tip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='uk-tip'>{this.props.text}</div>
  }
}
