import React, { Component } from 'react';
import { render } from 'react-dom';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';
import Menu from './../views/menu/menu.jsx';
import Video from './../views/video/video.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div style={ app }>
        <Banner />
        <Nav />
        <Breadcrumbs />
        <div style={ container }>
          <Menu />
          <Video />
        </div>
      </div>
    )
  }
}

const app = {
  display: 'flex',
  flexDirection: 'column',
};

const container = {
  backgroundColor: 'green',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '800px',
}
