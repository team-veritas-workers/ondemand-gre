import React, { Component } from 'react';
import Radium from 'radium';
import Banner from './../banner/banner.jsx';
import Breadcrumbs from './../breadcrumbs/breadcrumbs.jsx';
import ReactPlayer from 'react-player';
import Duration from './duration.jsx';

import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

class Video extends Component {
  constructor() {
    super();
    this.load = this.load.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.playPause = this.playPause.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.mute = this.mute.bind(this);
    this.setPlaybackRate = this.setPlaybackRate.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekChange = this.onSeekChange.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.onConfigSubmit = this.onConfigSubmit.bind(this);
    this.renderLoadButton = this.renderLoadButton.bind(this);
    this.state = {
      url: 'https://gre-on-demand.veritasprep.com/gre_1_1.mp4',
      playing: true,
      mute: 0,
      volume: 0.8,
      loaded: 0,
      played: 0,
      duration: 0,
      playbackRate: 1.0,
      seeking: null
    };
  }

  // VIDEO CONTROLS 
  load(location) {
    this.setState({
      url: location,
      played: 0,
      loaded: 0
    });
  }

  setPlayer(instance) {
    const newState = this.state;
    newState.player = instance;
    this.setState(newState);
  }

  playPause(){
    const newState = this.state;
    this.state.playing = !this.state.playing;
    this.setState(newState);
  }

  setVolume(e) {
    const newState = this.state;
    newState.volume = parseFloat(e.target.value);
  }

  mute(e) {
    const newState = this.state;
    if (newState.volume) {
      newState.mute = newState.volume;
      newState.volume = 0;
    } else {
      newState.volume = newState.mute;
      newState.mute = 0;
    }
    this.setState(newState);
  }

  setPlaybackRate(e) {
    const newState = this.state;
    newState.playbackRate = parseFloat(e.target.value);
    this.setState(newState);
  }

  onSeekMouseDown(e) {
    console.log('DOWN');
    const newState = this.state;
    newState.seeking = true;
    this.setState(newState);
  }

  onSeekChange(e) {
    console.log('CHANGE');
    const newState = this.state;
    newState.played = parseFloat(e.target.value);
    this.setState(newState);
  }

  onSeekMouseUp(e) {
    const newState = this.state;
    newState.seeking = false;
    this.setState(newState);
    this.player.seekTo(parseFloat(e.target.value));
  }

  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player)); 
  }

  onConfigSubmit() {
    let config;
    try {
      config = JSON.parse(this.configInput.value);
    }
    catch (err) {
      config = {};
      console.error('Error setting config:', err);
    }

    this.setState(config);
  }

  renderLoadButton(url, label) {
    return (
      <button onClick={ () => this.load(url) }>
        { label }
      </button>
    )
  }
  // LIFECYCLE METHODS

  render() {

    let lessonData;
    let player;

    if (this.props.currentVideo) {
      lessonData = this.props.currentVideo
    } else {
      lessonData = {
        lessonName: 'Foundations of GRE Logic',
        lessonDescription: 'Build the core GMAT skills and understand what the test measures',
        videoTitle: 'Foundations of GRE'
      }
    }

    return (
      <div style={ videoContainer }>
        <Banner user={ this.props.user } lessonData={ lessonData }/>
          <div style={ videoComponent }>
            <ReactPlayer
              height="100%"
              width="100%"
              ref={ player => this.player = player }
              url='https://gre-on-demand.veritasprep.com/gre_1_1.mp4'
              className='react-player'
              playing={ this.state.playing }
              playbackRate = { this.state.playbackRate }
              volume = { this.state.volume }
              onReady={ () => console.log('Ready to play...') }
              onStart={ () => console.log('Video started!') }
              onReady={ () => console.log('onReady') }
              onStart={ () => console.log('onStart' )}
              onPlay={ () => this.setState({ playing: true }) }
              onPause={ () => this.setState({ playing: false }) }
              onBuffer={ () => console.log('onBuffer') }
              onEnded={ () => this.setState({ playing: false }) }
              onError={ e => console.log('onError', e) }
              onProgress={ this.onProgress }
              onDuration={ duration => this.setState({ duration }) }/>
            <div style={ overlay }>
              <div style={ controls }>
                <button style={ videoButton } onClick={ this.playPause }>{ !this.state.playing ? <span>&#9658;</span> : <span>&#10074;&#10074;</span> }</button>
                <input
                  style={ seeker }
                  type='range' min={ 0 } max={ 1 } step='any'
                  value={ this.state.played }
                  onMouseDown={ this.onSeekMouseDown }
                  onChange={ this.onSeekChange }
                  onMouseUp={ this.onSeekMouseUp }
                />
                <Duration seconds={ this.state.duration * this.state.played } /> / 
                <Duration seconds={ this.state.duration } />
                <button onClick={ this.setPlaybackRate } value={ 1 }>Normal</button>
                <button onClick={ this.setPlaybackRate } value={ 1.5 }>1.5x</button>
                <button onClick={ this.mute }>Mute</button>
                <input
                  type='range' min={ 0 } max={ 1 } step='any'
                  value={ this.state.volume }
                  onChange={ this.setVolume }
                />
                <button style={ videoButton } onClick={ this.onClickFullscreen }><span>&#9645;</span></button>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const videoComponent = {
  border: '1px solid #333',
  position: 'relative',
  height: '500px',
  width: '100%',
}

const seeker = {
  width: '50%',
}

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
    opacity: '1',
    transition: 'all .3s linear',
  }
}

const controls = {
  backgroundColor: 'blue',
  bottom: '0',
}

const videoButton = {
  height: '40px',
  width: '40px',
  fontSize: '1.2em'
}

const videoContainer = {
  backgroundColor: '#FAFAFA',
  width: '100%',
}

const description = {
  backgroundColor: 'transparent',
  fontSize: '1.8em'
}

const italic = {
  fontStyle: 'italic',
  fontSize: '1em'
}

const video = {
  margin: '25px',
}

export default Radium(Video);