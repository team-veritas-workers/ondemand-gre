import React, { Component } from 'react';
import Radium from 'radium';
import dlIcon from './../../../assets/dl_icon.png';

const Lesson = (props) => {
  const contents = []; 
  props.lessonData.videos.forEach((video, i) => {
    const selectVideo = (e) => {
      props.setCurrentVideo(video, props.lessonData);
    }
    contents.push(
      <div onClick={ selectVideo } id={ video.name } key={ i } style={ videoTitle }>
        <span key={ `${i}-individual` } style={ downloadIndy } onClick={ props.downloadIndVid }>DL</span>
        { video.title }
        <span style={ abs }>
          <span style={ download } id={ video.name }>
            <span style={ complete }></span>
          </span>
        </span>
      </div>
    )
  });

  const grabAllVideoNames = (e) => {
    function videoNames() {
      const allVideoNames = []; 
      //console.log(lessons[0].props.lessonData.videos)
      props.lessonData.videos.forEach((video, i) => {
        allVideoNames.push(video.name)
      })
      console.log('this is the array allVideoNames' , allVideoNames)
      return allVideoNames;
    }
    props.downloadAllLessson(e, videoNames());
  }

  return (
      <div style={ lesson }> 
        <div style={ lessonTitle } onClick={ () => props.expandLesson(props.lessonData) }>
          <span style={ titleText }>{ props.lessonData.name }</span>
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

const downloadIndy = {
  position: 'absolute',
  left: '10px',
  backgroundColor: 'green',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '20px',
  width: '20px',
  borderRadius: '4px',
  ':hover': {
    backgroundColor: 'lightgreen'
  }
}

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
    backgroundColor: 'blue'
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
}

const videoTitle = {
  overflowY: 'auto',
  color: 'white',
  margin: '-1px',
	padding: '10px 40px 10px 35px',
	listStyle: 'none',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 10px center',
	backgroundSize: '16px',
  position: 'relative',
  transition: 'all .4s ease',
  ':hover': {
    backgroundColor: 'blue',
    cursor: 'pointer',
  }
}

// const download = {
//   height: '15px',
//   backgroundSize: '15px, 15px',
//   //backgroundImage: 'url("http://www.lawngames.co.za/images/download/dl2.png")',
//   backgroundRepeat: 'no-repeat',
//   paddingLeft: '20px',
//   marginLeft: '4px',
//   backgroundImage: `url(http://files.softicons.com/download/folder-icons/methodic-folders-remix-icons-by-arkangl300/png/512x512/Download.png)`,
// }

const abs = {
  position: 'absolute',
  right: '10px',
}


const download = {
  display: 'inline-block',
  border: 'solid .1px #777',
  borderRadius: '2px',
  height: '5px',
  width: '45px',
  backgroundColor: 'transparent',
  position: 'relative',
}

const complete = {
  display: 'inline-block',
  position: 'absolute',
  backgroundColor: 'lightgreen',
  width: '60%',
  height: '100%',
}

export default Radium(Lesson);