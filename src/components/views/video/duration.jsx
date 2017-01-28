import React, { Component } from 'react';

class Duration extends Component {
  constructor(props) {
    super(props);
    this.format = this.format.bind(this);
    this.pad = this.pad.bind(this);
  }

  format(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = this.pad(date.getUTCSeconds());
    return hh ? `${hh}:${pad(mm)}:${ss}` : `${mm}:${ss}`;
  }

  pad(string) {
    return ('0' + string).slice(-2);
  }

  render() {
    return (
      <time style={ time } dateTime={ `P${Math.round(this.props.seconds)}S` }>
        { this.format(this.props.seconds) }
      </time>
    )
  }
}

const time = {
  margin: '0px 5px',
  fontWeight: '100',
  display: 'flex',
  alignItems: 'center',
}

export default Duration;
