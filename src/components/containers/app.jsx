import React, { Component } from 'react';
import Banner from './../sections/banner.jsx';
import Nav from './../sections/nav.jsx';
import Breadcrumbs from './../sections/breadcrumbs.jsx';
import Video from './../sections/video.jsx';
import Library from './../sections/library.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Vincent',
    }
  }
  
  render() {
    return (
      <div>
        <Banner user={ this.state.user }/>
        <Nav />
        <Breadcrumbs />
        <Video />
        <Library />
      </div>
    )
  }
}
