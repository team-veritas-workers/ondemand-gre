import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/video.jsx';

const Content = (props) => {
  return (
    <div style={ container }>
      <Menu user={ props.user } setCurrentVideo={ props.setCurrentVideo } downloadIndVid={ props.downloadIndVid } videoData={ props.videoData } playVideo={ props.playVideo } expandLesson={ props.expandLesson } showMenu={ props.showMenu } />
      <Video user={ props.user } toggleMenu={ props.toggleMenu } currentVideo={ props.currentVideo } videoData={ props.videoData }/>
    </div>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'row',
  flex: '2',
}

export default Content;