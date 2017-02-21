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
    this.getVideoData = this.getVideoData.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandLesson = this.expandLesson.bind(this);
    this.setCurrentVideo = this.setCurrentVideo.bind(this);
    this.downloadIndVid = this.downloadIndVid.bind(this);
    this.downloadAllLessson = this.downloadAllLessson.bind(this);
    this.cookieChecker = this.cookieChecker.bind(this);
    this.logout = this.logout.bind(this);
    this.changeVideoDataState = this.changeVideoDataState.bind(this);
    this.saveProgressAuto = this.saveProgressAuto.bind(this);
    this.hdCheck = this.hdCheck.bind(this)

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
      downloadAllActive: true
    };
  }

  setCurrentVideo(video, lesson) {
    const fileName = `${video.name}.mp4`
    const currentVideo = { videoTitle: video.title, videoName: video.name, lessonName: lesson.name, lessonDescription: lesson.description };
    ipcRenderer.once('play-video', (event, arg) => this.setState({ url: arg, currentVideo: currentVideo }));
    //ipcRenderer.once('offline-vid-error', () => alert('Video not available offline.'));
    ipcRenderer.send('get-video', fileName);
  }

  logout() {
    console.log(this.state.user);
    ipcRenderer.send('logout', { name: this.state.user });
    this.setState({ authenticated: false });
  }

// Runs everytime app is opened to validate cookie is less than 1 week old
  cookieChecker(state) {
    ipcRenderer.send('check-cookie');
    ipcRenderer.on('cookie-exists', function (event, arg) {
      if (arg[0].length !== 0) {
        this.setState({ authenticated: true, user: arg[0][0].name, progress: arg[1], sid: arg[1].sid });
        // console.log('this is this.state.progress in cookieChecker:' , this.state.progress.sid)
      } else {
        this.setState({ authenticated: false });
      }
    }.bind(this))
  }

  usernameOnChange(e) {
    this.setState({ username: e.target.value });
  }

  passwordOnChange(e) {
    this.setState({ password: e.target.value });
  }

  authenticate(e) {
    //console.log("auth state", this.state)
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
          console.log("res", res)
          ipcRenderer.send('save-user', { email: res.data.user.email, user: res.data.user.firstname, progress: res.data.user.progress, sid: res.data.user.SID }, res.data.user.SID);
          //progressArg.sid = this.state.sid; 

          //state has been set before anything in componentWillMount using the HD function
          //so here I am checking to see if the data on the hard disk matches with the actual
          //authenticated user. If there is not a match, then we will update state with the newly
          //aqquired data. If there is a match then we proceed as usual
          if (this.state.progress === undefined || this.state.progress.sid !== JSON.parse(res.data.user.SID)) {
            console.log(typeof this.state.progress.sid, typeof res.data.user.SID, "this sid doesnt match!!!!!")
            const improvedProg = {};
            const progressArg = res.data.user.progress;

            for (let i = 0; i < progressArg.length; i += 1) {
              let vidId = progressArg[i].video_id;
              improvedProg[vidId] = parseInt(progressArg[i].length);
            }
            improvedProg['sid'] = res.data.user.SID;

            this.setState({ authenticated: true, user: res.data.user.firstname, progress: improvedProg, sid: res.data.user.SID });
          }
          else {
            console.log("The SID matches!!!!!!!!!!!!");

            const improvedProg = this.state.progress;
            const progressArg = res.data.user.progress;
            for (let i = 0; i < progressArg.length; i += 1) {


              let vidId = progressArg[i].video_id;
              if (improvedProg[vidId] < parseInt(progressArg[i].length || !improvedProg[vidId])) {
                improvedProg[vidId] = parseInt(progressArg[i].length);
              }
            }
            improvedProg['sid'] = res.data.user.SID;

            this.setState({ authenticated: true, user: res.data.user.firstname, progress: improvedProg, sid: res.data.user.SID });

          }
          // console.log('!!!this is sid in app' , this.state.sid);
        } else {
          this.setState({ invalidLoginMessage: res.data.message });
        }
      }).catch(err => console.log(err));
    }
  }

  getVideoData() {
    ipcRenderer.send('get-video-data');
    ipcRenderer.once('load-video-data', (event, arg) => {
      const videoData = JSON.parse(arg);
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
    if (navigator.onLine) {
      e.preventDefault();
      e.stopPropagation();
      
      const hd = `https://gre-on-demand.veritasprep.com/${ id }.mp4`;

      if (!this.state.videoData[lesson].videos[video].downloadProgress || this.state.videoData[lesson].videos[video].downloaded === 'false') {
        ipcRenderer.send('download-video', hd, lesson, parseInt(video));
      }
    } else {
      alert('No network connection detected.');
    }
  }

  downloadAllLessson(e, lessonData) {
    if (navigator.onLine) {
      e.stopPropagation();
      console.log(this.state.downloadAllActive);
      const lesson = parseInt(lessonData.lessonNumber) - 1;
      const indexUrl = lessonData.videos.map((video, index) => [video.name, index]);
      indexUrl.forEach(video => {
        this.downloadIndVid(e, lesson, video[1], video[0]);
      });
    } else {
      alert('No network connection detected.');
    }
  }


  getDownloadProgress() {
    ipcRenderer.on('download-progress', (event, progress, lesson, video) => {
      const videoData = this.state.videoData.slice(0);
      if (videoData[lesson]) {
        videoData[lesson].videos[video].downloadProgress = `${ progress }`;
        this.setState({ videoData: videoData });
      }
    });
  }

// checks when app is started to see if anything in progress.json to set state
  hdCheck() {
    ipcRenderer.send('getHD');
    ipcRenderer.on('hdCheck', function (event, arg) {
      if (arg) {
        console.log("hd check worked", arg);
        this.setState({ progress: arg });
      }
      else {
        console.log("hd check didnt pass");
      }
    }.bind(this))
  }

  toggleOfflineVidAlert() {
    this.setState({ offlineVidAlert: false });
  }

  componentDidMount() {
    this.hdCheck();
    const tenSec = 10000;
    this.getDownloadProgress();
    this.getVideoData();
    setInterval(this.saveProgressAuto, tenSec);
    setTimeout(() => this.cookieChecker(this.state), 700);
  }

// function called in reactVideo.jsx which is a part of auto deletion script that deletes videos every month
  changeVideoDataState(percent) {
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
    if (percent > accessProgress[videoId] || !accessProgress[videoId]) {
      accessProgress[videoId] = percent;
      this.setState({ progress: accessProgress });
    }
  }



  // there is a setInterval in app.js under componentDidMount that runs every 10 sec. 
  // saves progress from state to HD
  saveProgressAuto() {
    console.log('inside saveProgressAuto in app.js (state saved to HD)');
    if (this.state.progress) {
      ipcRenderer.send('save-progress-auto', this.state.progress, this.state.sid);
    }
  }

// Gives feedback to user if they click signup button when they are offline
  offlineSignUpAlert() {
    alert('Signup feature is not available offline');
  }


  render() {
    if (this.state.authenticated === false) {
      return (
        <div style={app}>
          <Login
            offlineSignUpAlert={this.offlineSignUpAlert}
            authenticate={this.authenticate}
            usernameOnChange={this.usernameOnChange}
            passwordOnChange={this.passwordOnChange}
            invalidLoginMessage={this.state.invalidLoginMessage} />
        </div>
      );
    }
    else if (this.state.authenticated === true) {
      return (
        <div style={app}>
          <Content
            changeVideoDataState={this.changeVideoDataState}
            progress={this.state.progress}
            authenticate={this.authenticate}
            stateLog={this.state.logout}
            logger={this.logout}
            downloadAllLessson={this.downloadAllLessson}
            downloadIndVid={this.downloadIndVid}
            user={this.state.user}
            toggleMenu={this.state.toggleMenu}
            currentVideo={this.state.currentVideo}
            setCurrentVideo={this.setCurrentVideo}
            videoData={this.state.videoData}
            expandLesson={this.expandLesson}
            showMenu={this.state.showMenu}
            url={this.state.url}
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