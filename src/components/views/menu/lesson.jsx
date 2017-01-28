import React, { Component } from 'react';
import Radium from 'radium';
import dlIcon from './../../../assets/dl_icon.png';

const Lesson = (props) => {
  const contents = []; 
  props.lessonData.videos.forEach((video, i) => {
    const selectVideo = (e) => {
      props.setCurrentVideo(video, props.lessonData);

      // props.playVideo(e, props.lessonData);
    }
    // contents.push(<div onClick={ selectVideo } id={ video.name } key={i} style={ videoTitle }>{ video.title } {/*<span id={ video.name } onClick={ props.downloadIndVid }>DL</button>*/}</div>)
    contents.push(<div onClick={ selectVideo } id={ video.name } key={i} style={ videoTitle }>{ video.title } <span style={ download } id={ video.name } onClick={ props.downloadIndVid }></span></div>)
  });


  const grabAllVideoNames = () => {
    console.log(props.lessonData)
    function videoNames() {
      const allVideoNames = []; 
      //console.log(lessons[0].props.lessonData.videos)
      props.lessonData.videos.forEach((video, i) => {
        allVideoNames.push(video.name)
      })
      console.log('this is the array allVideoNames' , allVideoNames)
      return allVideoNames;
    }
    
    props.downloadAllLessson(videoNames());
}



  return (
      <div style={ lesson }>
        <div style={ lessonTitle } onClick={ () => props.expandLesson(props.lessonData) }>
          <span style={ titleText }>{ props.lessonData.name }</span>
          <span style={ downloadIcon } onClick={ grabAllVideoNames } ></span>
        </div>
        <div style={ !props.open ? lessonContent : lessonContentOpen  }>
          <div key="text" style={ !props.open ? lessonContentText : lessonContentTextOpen  }>
            { contents }
          </div>
        </div>
      </div>
  );
};

const lesson = {
  backgroundColor: 'transparent',
  fontSize: '.9em',
  overflow: 'auto'
}


const lessonTitle = {
  backgroundColor: 'transparent',
  height: '40px',
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  textAlign: 'left',
  fontWeight: 'bold',
  paddingLeft: '15px',
  position: 'relative',
  zIndex: '2000',
  borderRadius: '4px',
  transition: 'all .4s ease',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#DA5D12'
  }
}

const downloadIcon = {
  display: 'inline-block',
  height: '18px',
  width: '18px',
  backgroundSize: '18px, 18px',
  backgroundImage: `url(${ dlIcon })`,
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  right: '8px'
}

const titleText = {

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
  // transition: 'all 1s ease-in',
}

const videoTitle = {
  overflowY: 'auto',
  color: 'white',
  margin: '-1px',
	padding: '10px 40px 10px 10px',
	listStyle: 'none',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 10px center',
	backgroundSize: '16px',
  position: 'relative',
  transition: 'all .4s ease',
  ':hover': {
    backgroundColor: '#DA5D12',
    cursor: 'pointer',
  }
}


// const downloadIndVideoButton = {
//   height: '15px',
//   backgroundSize: '15px, 15px',
//   //backgroundImage: 'url("http://www.lawngames.co.za/images/download/dl2.png")',
//   backgroundRepeat: 'no-repeat',
//   paddingLeft: '20px',
//   marginLeft: '4px',
//   backgroundImage: `url(http://files.softicons.com/download/folder-icons/methodic-folders-remix-icons-by-arkangl300/png/512x512/Download.png)`,
// }

const download = {
  display: 'inline-block',
  borderRadius: '50%',
  height: '5px',
  width: '5px',
  backgroundColor: 'lightgreen',
  position: 'absolute',
  right: '10px',

}

export default Radium(Lesson);