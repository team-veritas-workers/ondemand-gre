import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/video.jsx';
// import Video from './../video/reactVideo.jsx';

const Content = (props) => {
  return (
    <div style={ container }>
      <Menu videoData={ props.videoData } playVideo={ props.playVideo } expandLesson={ props.expandLesson } showMenu={ props.showMenu } />
      <Video videoData={ props.videoData }/>
    </div>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'row',
  flex: '2',
}

export default Content;