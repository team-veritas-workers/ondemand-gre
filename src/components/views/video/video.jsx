import React, { Component } from 'react';
import vj from 'video.js';

const Video = (props) => {
  console.log(vj);
  return (
    <div style={ videoContainer }>

    </div>
  );
};

const videoContainer = {
  backgroundColor: '#33DDff',
  width: '100%'
}

export default Video;