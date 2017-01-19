import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';
import Content from './../views/content/content.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.getVideoData = this.getVideoData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }

  getVideoData() {
    // AXIOS NOT WORKING, USE JQUERY FOR NOW
    const URL = 'https://www.veritasprep.com/api/desktop-app/get_playlist.php';
    const body = { type: 'desktop', account: 'GRE' };

    $.post(URL, body)
    .then(res => {
      this.setState({ videoData: JSON.parse(res) });
    })
    .catch(err => console.log(err));
  }

  toggle(e) {
    const that = e.target.style;
    console.log(that);
  }

  componentDidMount() {
    this.getVideoData();
  }

  render() {
    return (
      <div style={ app }>
        <Banner />
        <Nav />
        <Breadcrumbs />
        <Content toggle={ this.toggle } videoData={ this.state.videoData }/>
      </div>
    )
  }
}

const app = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
};
