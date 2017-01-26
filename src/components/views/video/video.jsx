import React, { Component } from 'react';
import Banner from './../banner/banner.jsx';
import Breadcrumbs from './../breadcrumbs/breadcrumbs.jsx';


const Video = (props) => {
  console.log('hi');
  console.log(props.currentVideo);
  console.log(props.playVideo);
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


      <Banner logOutStuff={props.logOutStuff} user={ props.user } lessonData={ lessonData }/>
          {console.log("video before abnner logger", props.logOutStuff)}
       

      <video style={ video } id="example_video_1" controls preload="auto" width="100%" height="auto">
        <source id="videoPlayer" src="https://gre-on-demand.veritasprep.com/gre_7_2.mp4" type="video/mp4" />
        <div>
          <span>Normal</span> | <span>1.5</span>
          <span>Standard</span> | <span>High Definition</span>
        </div>
      </video>
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