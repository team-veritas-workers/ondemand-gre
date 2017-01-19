import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/video.jsx';

const Content = (props) => {
  // SHOULD GO IN CONTAINER AND HAVE STATE
  return (
    <div style={ container }>
      <Menu toggle={ props.toggle } videoData={ props.videoData }/>
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