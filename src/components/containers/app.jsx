import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Login from './../views/auth/login.jsx';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';
import Menu from './../views/menu/menu.jsx';
import Video from './../views/video/video.jsx';
import Accordion from './../views/menu/accordion.jsx';
import Content from './../views/content/content.jsx';
import db from './../../../renderer.js';
import Datastore from 'nedb';
import electron, { ipcRenderer } from 'electron';

export default class App extends Component {
  constructor(props) {
    super(props);
    // LOGIN METHODS
    this.authenticate = this.authenticate.bind(this);
    this.setUser = this.setUser.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
    // MAIN METHODS
    // SHOW/HIDE
    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandLesson = this.expandLesson.bind(this);
    // PLAY VIDEO
    this.setCurrentVideo = this.setCurrentVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    // DOWNLOAD VIDEO
    this.downloadIndVid = this.downloadIndVid.bind(this);
    this.downloadAllLessson = this.downloadAllLessson.bind(this);
    this.cookieChecker = this.cookieChecker.bind(this);
    this.logout = this.logout.bind(this);

    // VIDEO CONTROLS
    // STATE

    this.state = {
      url: 'https://gre-on-demand.veritasprep.com/gre_1_1.mp4',
      authenticated: false,
      showMenu: true,
    };
  }

  setCurrentVideo(video, lesson) {
    const URL = `https://gre-on-demand.veritasprep.com/${ video.name }.mp4`
    const currentVideo = {
      videoTitle: video.title,
      videoName: video.name,
      lessonName: lesson.name,
      lessonDescription: lesson.description
    }
    this.setState({ url: URL, currentVideo: currentVideo });
  }

  logout(){
   // this.setState({logout:true});
    ipcRenderer.send('logout',{name: this.state.user});
    this.setState({authenticated:false})
    
  }
// I think we can delete this as it is also below
  // downloadIndVid(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const highDefDLVid = `https://gre-on-demand.veritasprep.com/${ e.target.id }.mp4`;
  //   ipcRenderer.send('download-video', highDefDLVid);
  // }

  cookieChecker(state) {
    console.log(this.state.authenticated);
      ipcRenderer.send('check-cookie')
      ipcRenderer.on('cookie-exists', function(event,arg){
        console.log("cookie was received");
        if (arg.length !== 0){
          this.setState({authenticated: true});
          this.setUser(arg[0].name);
        }
      }.bind(this))
  }
  // LOGIN METHODS
  authenticate(e) {
    e.preventDefault();
    const URL = 'https://gmat-on-demand-app.veritasprep.com/checkout/LIBRARY/auth/AEntry.php';
    const body = {
      action: 'login-gre-desktop-app',
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      key: 'y3yz8E%Xb4bTHDc2Ggh&nQ1X9Vsxm%$0'
    }

    $.post(URL, body)
    .then(res => {
      const data = JSON.parse(res);
      if (data.status === 'success') {
        const newState = this.state;
        newState.authenticated = true;
        this.setState({ authenticated: newState.authenticated });
        this.saveUserData(res, data.user.firstname);
        this.setUser(data.user.firstname);
      }
      if (data.status === 'error') {
        document.getElementById('invalid').innerText = data.message;
      }
    })
    .catch(err => console.log(err));
  }

  setUser(user) {
    const newState = this.state;
    newState.user = user;
    this.setState({ user: newState.user })
  }

  saveUserData(json,firstname) {
    // console.log("user info", JSON.parse(json))
    ipcRenderer.send('save-user', {email: JSON.parse(json).user.email, user: firstname })
    db.insert(JSON.parse(json), (err, docs) => {
      if (err) console.log(err);
      // console.log('Saved!');
    });
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

  playVideo(e) {
    const fileName = `${ e.target.id }.mp4`;
    console.log(fileName)
    ipcRenderer.on('play-video', (event, arg)=> {
      console.log('this is : videoPath:', arg);
      document.getElementById('videoPlayer').src = arg;
      document.getElementById('example_video_1').pause();
      document.getElementById('example_video_1').load();
      document.getElementById('example_video_1').play();
    })
    ipcRenderer.once('offline-vid-error', () => {
    console.log('inside app.jsx for error of not online')
      alert('You are offline and selected video has not been downloaded');
    })
    ipcRenderer.send('get-video', fileName);
  }

  // SHOW/HIDE
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

 
  // DOWNLOAD VIDEO
  downloadIndVid(e) {
    console.log(e.target.id)
    e.preventDefault();
    e.stopPropagation();
    const highDefDLVid = `https://gre-on-demand.veritasprep.com/${ e.target.id }.mp4`;
    ipcRenderer.send('download-video', highDefDLVid);
  }
  
  downloadAllLessson(videoNames) {
    console.log('downloadAllLessson icon has been clicked')
    console.log('this is on app side', videoNames)
    videoNames.forEach((video)=> {
     ipcRenderer.send('download-video', `https://gre-on-demand.veritasprep.com/${ video }.mp4`);
    })
    // videoNames.preventDefault();
    // videoNames.stopPropagation();
    // ipcRenderer.send('download-All-lesson-video', highDefDLVid);
  }
  
  componentDidMount() {
    this.cookieChecker(this.state);
    this.getVideoData();
  }
  
  render() {
    // LOGIN FIRST, PLEASE!
    if (!this.state.authenticated) {
      return (
        <div style={ app }>
          <Login authenticate={ this.authenticate }/>
        </div>
      )
    }
    // THANK YOU!
    else {
      return (
        <div style={ app }>
          <Content
            authenticate={this.authenticate}
            stateLog={this.state.logout}
            logger={this.logout}
            downloadAllLessson={ this.downloadAllLessson }
            downloadIndVid={ this.downloadIndVid }
            user={ this.state.user }
            toggleMenu={ this.state.toggleMenu }
            currentVideo={ this.state.currentVideo }
            setCurrentVideo={ this.setCurrentVideo }
            playVideo={ this.playVideo }
            videoData={ this.state.videoData }
            expandLesson={ this.expandLesson}
            showMenu={ this.state.showMenu }
            url={ this.state.url }
          />
        </div>
      )
    }
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