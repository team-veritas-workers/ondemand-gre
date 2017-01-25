import React, { Component } from 'react';
import Banner from './../banner/banner.jsx';
import Breadcrumbs from './../breadcrumbs/breadcrumbs.jsx';
import ReactPlayer from 'react-player';

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
      <Banner user={ props.user } lessonData={ lessonData }/>
      <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
      <div style={ video }>
        <span>Normal</span> | <span>1.5</span>
        <span>Standard</span> | <span>High Definition</span>
      </div>
    </div>
  );
};

const videoContainer = {
  backgroundColor: '#FAFAFA',
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

const video = {
  margin: '25px',
}

export default Video;