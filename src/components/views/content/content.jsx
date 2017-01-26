import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/reactVideo.jsx';

const Content = (props) => {
  return (
    <div style={ container }>
      <Menu user={ props.user } setCurrentVideo={ props.setCurrentVideo } downloadIndVid={ props.downloadIndVid } videoData={ props.videoData } loadVideo={ props.loadVideo } expandLesson={ props.expandLesson } showMenu={ props.showMenu } />
      <Video
        user={ props.user }
        toggleMenu={ props.toggleMenu }
        currentVideo={ props.currentVideo }
        videoData={ props.videoData }
        setPlayer = { props.setPlayer }
        stop = { props.stop } 
        playPause = { props.playPause }
        setPlaybackRate = { props.setPlaybackRate }
        videoPlayerState = { props.videoPlayerState }
        onSeekMouseDown = { props.onSeekMouseDown }
        onSeekChange = { props.onSeekChange }
        onSeekMouseUp = { props.onSeekMouseUp }
      />
    </div>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'row',
  flex: '2',
}

export default Content;