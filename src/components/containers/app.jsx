import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';
import Menu from './../views/menu/menu.jsx';
import Video from './../views/video/video.jsx';
import Accordion from './../views/menu/accordion.jsx';
import Content from './../views/content/content.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.playVideo = this.playVideo.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
    this.expandLesson = this.expandLesson.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      showMenu: true
    };
  }

  playVideo(e) {
    const highDef = `https://gre-on-demand.veritasprep.com/${ e.target.id }.mp4`;
    const stdDef= `https://gre-on-demand.veritasprep.com/360p_${ e.target.id }.mp4`;
    document.getElementById('videoPlayer').src = highDef;
    document.getElementById('example_video_1').pause();
    document.getElementById('example_video_1').load();
    document.getElementById('example_video_1').play();
  }

  toggleMenu() {
    const newState = this.state;
    newState.showMenu = !newState.showMenu;
    this.setState({ showMenu: newState.showMenu });
  }

  expandLesson(lesson) {
    const newState = this.state.videoData;
    const index = this.state.videoData.indexOf(lesson);
    newState[index].open = !newState[index].open;
    this.setState({ videoData: newState });
  }

  getVideoData() {
    const URL = 'https://www.veritasprep.com/api/desktop-app/get_playlist.php';
    const body = { type: 'desktop', account: 'GRE' };
    $.post(URL, body)
    .then(res => {
      const accordion = JSON.parse(res).map(item => {
        item.open = false;
        return item;
      });
      this.setState({ videoData: accordion });
    })
    .catch(err => console.log(err));
  }
  
  componentDidMount() {
    this.getVideoData();
  }

  render() {
    return (
      <div style={ app }>
        <Banner />
        <Breadcrumbs toggleMenu={ this.toggleMenu } />
        <Content playVideo={ this.playVideo } videoData={ this.state.videoData } expandLesson={ this.expandLesson} showMenu={ this.state.showMenu } />
      </div>
    )
  }
}

const app = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
};


const container = {
  backgroundColor: '#111539',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  overflow: 'hidden'
  
}
const me = {
  listStyle: 'none',
}