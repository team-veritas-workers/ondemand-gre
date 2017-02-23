import React, { Component } from 'react';
import Radium from 'radium';
import SelectVideo from './selectVideo.jsx';
// import dlIcon from './../../../assets/dl_icon.png';
import dlIcon from './../../../assets/dl_icon_transparent.png';
import dlIconHover from './../../../assets/dl_icon_hover.png';
import PieChart from 'react-simple-pie-chart';

const Lesson = (props) => {

  const grabAllVideoNames = (e) => props.downloadAllLessson(e, props.lessonData);
  const contents = [];
  props.lessonData.videos.forEach((video, i) => {
    contents.push(<SelectVideo setCurrentVideo={ props.setCurrentVideo } videoData={ video } lessonData={ props.lessonData } id={ i } key={ i } />);
  });

  return (
      <div style={ lesson }> 
        
        <div style={ lessonTitle } key="lessonTitle" onClick={ () => props.expandLesson(props.lessonData) }>
          <span>{ props.lessonData.name }</span>
          <span style={ downloadIcon } onClick={ grabAllVideoNames } key="downloadIcon"></span>
          <div style={ ppie }><PieChart slices={ slices(props) }/></div>
          <span style={ downloadIcon } onClick={ grabAllVideoNames }></span>
        </div>

        <div style={ !props.open ? lessonContent : lessonContentOpen }>
          <div key="text" style={ !props.open ? lessonContentText : lessonContentTextOpen }>
            { contents } 
          </div>
        </div>

      </div>
  );
};

const slices = (props) => [
    { color: 'rgba(225, 255, 255, .5)', value: 100 - props.lessonData.lessonGroupProgress },
    { color: 'rgba(255, 255, 255, 1)', value: props.lessonData.lessonGroupProgress }
];

  
const ppie = {
  position: 'absolute',
  right: '10px',
  height: '100%',
  width: '28px',
  marginTop: '6px'
}

const groupProgress = {
  fontSize: '10px',
  margin: '10px'
}

const lesson = {
  backgroundColor: 'transparent',
  fontSize: '.9em',
  overflow: 'auto'
}

const lessonTitle = {
  overflow: 'hidden',
  backgroundColor: 'transparent',
  height: '40px',
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  textAlign: 'left',
  fontWeight: 'bold',
  paddingLeft: '45px',
  position: 'relative',
  zIndex: '2000',
  borderRadius: '4px',
  transition: 'all .2s ease',
  ':hover': {
    color: '#FFF',
    backgroundColor: 'dodgerblue'
    // backgroundColor: '#e45c00'
  }
}

const downloadIcon = {
  display: 'flex',
  height: '100%',
  width: '35px',
  opacity: '.7',
  backgroundColor: 'transparent',
  backgroundImage: `url(${ dlIcon })`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '60%',
  backgroundPosition: 'center',
  position: 'absolute',
  left: '0',
  ':hover': {
    backgroundColor: 'lightgreen',
    opacity: '1',
    backgroundImage: `url(${ dlIconHover })`
  }
}

const lessonContent = {
  height: '30px',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  fontSize: '14px',
  position: 'relative',
  zIndex: '1000',
  marginTop: '-28px',
  textAlign: 'left',
	transition: 'all 1s ease',
	overflow: 'hidden',
  
}

const lessonContentOpen = {
  marginTop: '0px',
  height: 'fit-content',
	transition: 'all .4s ease-in',
	willChange: 'overflow',
  borderRadius: '4px',
  fontSize: '14px',
  position: 'relative',
  zIndex: '1000',
  textAlign: 'left',
	overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, .1)'
}

const lessonContentText = {
  visibility: 'hidden',
  opacity: '0',
  overflow: 'hidden',
  
}

const lessonContentTextOpen = {
  overflow: 'hidden',
  visibility: 'visible',
  opacity: '1',
}


const download = {
  display: 'inline-block',
  border: 'solid .1px #777',
  borderRadius: '2px',
  height: '5px',
  width: '45px',
  backgroundColor: 'transparent',
  position: 'absolute',
  right: '10px',
}

export default Radium(Lesson);