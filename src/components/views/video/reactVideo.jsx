import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Radium from 'radium';
import Banner from './../banner/banner.jsx';
import Breadcrumbs from './../breadcrumbs/breadcrumbs.jsx';
import ReactPlayer from 'react-player';
import Duration from './duration.jsx';
import screenfull from 'screenfull';
import playButton from './../../../assets/play_icon.png';
import pauseButton from './../../../assets/pause_icon.png';
import volumeIcon from './../../../assets/volume_icon.png';
import muteIcon from './../../../assets/mute_icon.png';
import fullscreenIcon from './../../../assets/fullscreen_icon.png';


class Video extends Component {
  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.mute = this.mute.bind(this);
    this.setPlaybackRate = this.setPlaybackRate.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.state = {
      playing: false,
      mute: 0,
      volume: 0.8,
      loaded: 0,
      played: 0,
      duration: 0,
      playbackRate: 1.0,
      seeking: null
    };
  }

  playPause() { 
    this.setState({ playing: !this.state.playing });
  }

  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
  }

  mute() {
    this.state.volume
    ? this.setState({ mute: this.state.volume, volume: 0 })
    : this.setState({ volume: this.state.mute, mute: 0 });
  }

  setPlaybackRate(e) {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  onSeekMouseDown(e) {
    this.setState({ seeking: true });
  }

  onSeekChange(e) {
    this.setState({ played: parseFloat(e.target.value) });
  }

  onSeekMouseUp(e) {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }

  onProgress(state) {
    !this.state.seeking ? this.setState(state) : null;
    this.props.changeVideoDataState(this.state.played * 100)
  }
     
  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player)); 
  }

  render() {
    const defaultData = { lessonName: 'Foundations of GRE Logic', lessonDescription: 'Build the core GMAT skills and understand what the test measures', videoTitle: 'Foundations of GRE' }
    const lessonData = this.props.currentVideo ? this.props.currentVideo : defaultData;

    //console.log(`${((this.state.played * this.state.duration)) / (this.state.duration)*100}%`)
    //console.log('this.props.currentVideo' ,this.props.currentVideo)

    return (
      <div style={ contentContainer }>
        <Banner user={ this.props.user } lessonData={ lessonData } logger={ this.props.logger } saveProgressClicked={ this.props.saveProgressClicked }/>
          <div style={ videoComponent }>
            <ReactPlayer
              height = "100%"
              width = "100%"
              ref = { player => this.player = player }
              url = { this.props.url }
              className = 'react-player'
              playbackRate = { this.state.playbackRate }
              playing = { this.state.playing }
              volume = { this.state.volume }
              onProgress = { this.onProgress }
              onDuration = { duration => this.setState({ duration }) }
              onPlay = { () => this.setState({ playing: true }) }
              onPause = { () => this.setState({ playing: false }) }
              onEnded = { () => this.setState({ playing: false }) }
              // onBuffer = { () => console.log('onBuffer') }
              // onReady = { () => console.log('Ready to play...') }
              // onStart = { () => console.log('Video started!') }
              // onError = { e => console.log('onError', e) }
            />
            <div style={ this.state.playing ? overlay : pause }>
              <div style={ controls }>
                <div style={ playPauseContainer }>
                  <button key="playPause" style={ button } onClick={ this.playPause }>{ !this.state.playing ? <img src={ playButton } height="59%" width="auto" /> : <img src={ pauseButton } height="59%" width="auto"  /> }</button>
                </div>
                <div style={ timeTracker }>
                  <Duration seconds={ this.state.duration * this.state.played } /> / 
                  <Duration seconds={ this.state.duration } />
                  <input style={ seeker } type='range' min={ 0 } max={ 1 } step='any' value={ this.state.played } onMouseDown={ this.onSeekMouseDown } onChange={ this.onSeekChange } onMouseUp={ this.onSeekMouseUp }/>
                </div>
                <div style={ playbackContainer }>
                  <button style={ this.state.playbackRate  === 1.0 ? button : inactive } key="playbackNormal" onClick={ this.setPlaybackRate } value={ 1 }>Normal</button>
                  <button style={ this.state.playbackRate  === 1.5 ? button : inactive } key="playbackFast" onClick={ this.setPlaybackRate } value={ 1.5 }>1.5x</button>
                </div>
                <div style={ volumeContainer }>
                  <button key="mute" style={ button } onClick={ this.mute }><img height="59%" width="auto" src={ this.state.volume === 0 ? muteIcon : volumeIcon } /></button>
                  <input style={ seekerVol } type='range' min={ 0 } max={ 1 } step='any' value={ this.state.volume } onChange={ this.setVolume }/>
                </div>
                <div style={ fullscreenContainer }>
                  <button key="fullscreen" style={ button } onClick={ this.onClickFullscreen }><img height="59%" width="auto" src={ fullscreenIcon } /></button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
// CONTAINERS
const videoComponent = {
  position: 'relative',
  width: '100%',
}

const contentContainer = {
  position: 'relative',
  padding: '114px 25px',
  width: '100%',
  backgroundColor: '#FAFAFA'
}
const fullscreenContainer = {
  display: 'flex',
  alignItems: 'center',
}

const volumeContainer = {
  display: 'flex',
  alignItems: 'center',
}

const playbackContainer = {
  color: '#FFF',
  fontSize: '1.2em',
  minWidth: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const playPauseContainer = {
  display: 'flex',
  alignItems: 'center',
}
// OVERLAY AND CONTROLS
const overlay = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  zIndex: '2', 
  backgroundColor: 'transparent',
  position: 'absolute',
  left: '0',
  top: '0',
  height: '100%',
  width: '100%',
  opacity: '0',
  transition: 'all .1s linear',
  ':hover': {
    opacity: '.8',
    transition: 'all .3s linear',
  }
}

const pause = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  zIndex: '2', 
  backgroundColor: 'transparent',
  position: 'absolute',
  left: '0',
  top: '0',
  height: '100%',
  width: '100%',
  opacity: '.8',
}

const controls = {
  height: '32px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  color: '#EAEAEA',
  backgroundColor: 'rgba(17, 21, 57, .8)',
  bottom: '0',
}
// DURATION AND SEEKER BAR
const timeTracker = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: '2',
  margin: '5px',
  fontSize: '12px',
}

const seeker = {
  display: 'flex',
  flexGrow: '2',
  alignItems: 'center',
}

// VOLUME CONTROLS AND MUTE
const seekerVol = {
  width: '100%'
}

const button = {
  color: 'white',
  outline: 'none',
  backgroundColor: 'transparent',
  height: '32px',
  width: '32px',
  fontSize: '.5em',
  margin: '2px',
  borderRadius: '4px',
  borderStyle: 'none',
  transition: 'all .1s linear',
}

const inactive = {
  color: '#999',
  outline: 'none',
  backgroundColor: 'transparent',
  height: '32px',
  width: '32px',
  fontSize: '.5em',
  margin: '2px',
  borderRadius: '4px',
  borderStyle: 'none',
  transition: 'all .1s linear',
}

const description = {
  backgroundColor: 'transparent',
  fontSize: '1.8em'
}

const italic = {
  fontStyle: 'italic',
  fontSize: '1em'
}

export default Radium(Video);