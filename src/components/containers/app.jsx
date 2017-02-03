import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import Login from './../views/auth/login.jsx';
import Content from './../views/content/content.jsx';
import Spinner from './../views/spinner/spinner.jsx';
import electron, { ipcRenderer } from 'electron';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.usernameOnChange = this.usernameOnChange.bind(this);
    this.passwordOnChange = this.passwordOnChange.bind(this);    
    this.saveUserData = this.saveUserData.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandLesson = this.expandLesson.bind(this);
    this.setCurrentVideo = this.setCurrentVideo.bind(this);
    this.downloadIndVid = this.downloadIndVid.bind(this);
    this.downloadAllLessson = this.downloadAllLessson.bind(this);
    this.cookieChecker = this.cookieChecker.bind(this);
    this.logout = this.logout.bind(this);
    this.changeVideoDataState = this.changeVideoDataState.bind(this);
    this.saveProgressClicked = this.saveProgressClicked.bind(this);
    this.state = {
      user: null,
      username: null,
      password: null,
      url: 'https://gre-on-demand.veritasprep.com/gre_1_1.mp4',
      currentVideo: null,
      authenticated: null,
      showMenu: true,
      invalidLoginMessage: '',
      videoData: null,
      progress: null,
    };
  }

  setCurrentVideo(video, lesson) {
    const fileName = `${ video.name }.mp4`
    const currentVideo = { videoTitle: video.title, videoName: video.name, lessonName: lesson.name, lessonDescription: lesson.description };
    ipcRenderer.once('play-video', (event, arg) => this.setState({ url: arg, currentVideo: currentVideo }));
    // ipcRenderer.once('offline-vid-error', () => console.log('Video not available offline.'));
    ipcRenderer.send('get-video', fileName);
  }

  logout(){
    ipcRenderer.send('logout', { name: this.state.user });
    this.setState({ authenticated: false });
  }

   cookieChecker(state) {
      ipcRenderer.send('check-cookie')
      ipcRenderer.on('cookie-exists', function(event, arg){
        if (arg[0].length !== 0){
          this.setState({ authenticated: true, user: arg[0][0].name, progress: arg[1] });
        } else {
          this.setState({ authenticated: false })
        }
      }.bind(this))
  }

  usernameOnChange(e) {
    this.setState({ username: e.target.value })
  }

  passwordOnChange(e) {
    this.setState({ password: e.target.value })
  }

  authenticate(e) {
    if (e.key === 'enter' || e.type === 'click') {
      e.preventDefault();
      const URL = 'https://gmat-on-demand-app.veritasprep.com/checkout/LIBRARY/auth/AEntry.php';
      const body = {
        action: 'login-gre-desktop-app',
        username: this.state.username,
        password: this.state.password,
        key: 'y3yz8E%Xb4bTHDc2Ggh&nQ1X9Vsxm%$0'
      }

      axios.post(URL, qs.stringify(body)).then(res => {
        if (res.data.status === 'success') {

          ipcRenderer.send('save-user', { email: res.data.user.email, user: res.data.user.firstname, progress: res.data.user.progress, sid: res.data.user.SID });

          this.setState({ authenticated: true, user: res.data.user.firstname, progress: res.data.user.progress });
        } else {
          this.setState({ invalidLoginMessage: res.data.message });
        }
      }).catch(err => console.log(err));      
    }
  }

  saveUserData(json,firstname) {
    ipcRenderer.send('save-user', {email: JSON.parse(json).user.email, user: firstname })
  }

  getVideoData() {
    ipcRenderer.send('get-video-data');
    ipcRenderer.once('load-video-data', (event, arg) => {
      const videoData = JSON.parse(arg).map(lesson => {
        lesson.open = false;
        return lesson;
      });
      this.setState({ videoData: videoData })
    });
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

  downloadIndVid(e, lesson, video, id) {
    e.preventDefault();
    e.stopPropagation();
    const hd = `https://gre-on-demand.veritasprep.com/${ id }.mp4`;
    const sd = `https://gre-on-demand.veritasprep.com/360p_${ id }.mp4`;
    ipcRenderer.send('download-video', hd, lesson, parseInt(video));
  }
  
  downloadAllLessson(e, lessonData) {
    e.stopPropagation();
    // videoNames.forEach((video)=> {
    //  ipcRenderer.send('download-video', `https://gre-on-demand.veritasprep.com/${ video }.mp4`);
    // });
    const lesson = parseInt(lessonData.lessonNumber) - 1;
    const indexUrl = lessonData.videos.map((video, index) => [video.name, index]);
    indexUrl.forEach(video => {
      this.downloadIndVid(e, lesson, video[1], video[0])
    });
  }

  getDownloadProgress() {
    ipcRenderer.on('download-progress', (event, progress, lesson, video) => {
      const videoData = this.state.videoData.slice(0);
      if (videoData[lesson]) {
        videoData[lesson].videos[video].downloadProgress = `${progress}`
        this.setState({ videoData: videoData })
      }
    });
  }
  
  componentDidMount() {
    const tenSec = 10000
    this.getDownloadProgress();
    this.getVideoData();
    setTimeout(() => this.cookieChecker(this.state), 700);
    setInterval(this.saveProgressClicked, tenSec);
  }

  changeVideoDataState(percent) {
    // console.log(this.state.url)
    let splitAtCom;
    let splitAtMp4;
    let videoId;

    if (this.state.url.includes('.com/')) {
      splitAtCom = this.state.url.split('.com/');
      splitAtMp4 = splitAtCom[1].split('.mp4');
      videoId = splitAtMp4[0];
        
    } else {
       splitAtCom = this.state.url.split('videos/');
       splitAtMp4 = splitAtCom[1].split('.mp4');
       videoId = splitAtMp4[0];
    }
  
    let accessProgress = this.state.progress;
    accessProgress[videoId] = percent;
    this.setState({progress: accessProgress});
  }
// below originally function was a button that needed to be clicked now there is a setInterval in app.js under componentDidMount that runs every 10 sec. maybe change the name?
  saveProgressClicked() {
    console.log('inside saveProgressClicked in app.js', this.state.progress);
    ipcRenderer.send('save-progress-clicked', this.state.progress);
  } 



  render() {
    // console.log('!!!!this.state.progress:', this.state.progress)
    if (this.state.authenticated === false) {
      return (
        <div style={ app }>
          <Login
            authenticate={ this.authenticate }
            usernameOnChange={ this.usernameOnChange }
            passwordOnChange={ this.passwordOnChange }
            invalidLoginMessage={ this.state.invalidLoginMessage }/>
        </div>
      );
    }
    else if (this.state.authenticated === true) {
      return (
        <div style={ app }>
          <Content
            changeVideoDataState={this.changeVideoDataState}
            progress={this.state.progress}
            authenticate={this.authenticate}
            stateLog={this.state.logout}
            logger={this.logout}
            downloadAllLessson={ this.downloadAllLessson }
            downloadIndVid={ this.downloadIndVid }
            user={ this.state.user }
            toggleMenu={ this.state.toggleMenu }
            currentVideo={ this.state.currentVideo }
            setCurrentVideo={ this.setCurrentVideo }
            videoData={ this.state.videoData }
            expandLesson={ this.expandLesson}
            showMenu={ this.state.showMenu }
            url={ this.state.url }
            saveProgressClicked={ this.saveProgressClicked }
          />
        </div>
      );
    }
    else {
      return (
        <Spinner />
      );
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