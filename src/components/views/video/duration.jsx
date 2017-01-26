import React, { Component } from 'react';
import Radium from 'radium';

class Duration extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.format = this.format.bind(this);
    this.pad = this.pad.bind(this);
  }

  format (seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = this.pad(date.getUTCSeconds());

    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }

    return `${mm}:${ss}`;
  }

  pad (string) {
    return ('0' + string).slice(-2);
  }

  render() {
    return (
      <time style={ time } dateTime={ `P${Math.round(this.props.seconds)}S` } className={ this.props.className }>
        { this.format(this.props.seconds) }
      </time>
    )
  }
}

const time = {

}

export default Radium(Duration);
