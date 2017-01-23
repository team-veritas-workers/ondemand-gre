import React, { Component } from 'react';

const Video = (props) => {
  return (
    <div style={ videoContainer }>
      <video id="example_video_1" controls preload="auto" width="100%" height="auto">
        <source id="videoPlayer" src="https://gre-on-demand.veritasprep.com/gre_1_1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const videoContainer = {
  backgroundColor: '#FAFAFA',
  padding: '25px',
  width: '100%'
}

export default Video;