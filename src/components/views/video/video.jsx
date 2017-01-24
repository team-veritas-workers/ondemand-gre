import React, { Component } from 'react';

const Video = (props) => {
  let lessonData;
  if (props.currentVideo) {
    lessonData = props.currentVideo
  } else {
    lessonData = {
      lessonName: 'Foundations of GRE Logic',
      lessonDescription: 'Build the core GMAT skills and understand what the test measures',
      videoTitle: 'Foundations of GRE'
    }
  }
  return (
    <div style={ videoContainer }>
      <div style={ description }>{ lessonData.lessonName } > { lessonData.videoTitle } - <span style={ italic }>{ lessonData.lessonDescription }</span></div>
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

const description = {
  backgroundColor: 'transparent',
  fontSize: '1.8em'
}

const italic = {
  fontStyle: 'italic',
  fontSize: '1em'
}

export default Video;