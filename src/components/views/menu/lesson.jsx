import React, { Component } from 'react';
import Radium from 'radium';
import dlIcon from './../../../assets/dl_icon.png';

const Lesson = (props) => {
  const contents = [];
  props.lessonData.videos.forEach((video, i) => {
    const selectVideo = (e) => {
      props.setCurrentVideo(video, props.lessonData);
    };

    const complete = {
      display: 'inline-block',
      position: 'absolute',
      backgroundColor: `lightgreen`,
      height: '100%',
      width: `${ video.length ? video.length : '0' }%`,
    };
    
    const light = {
      display: 'inline-block',
      opacity: `.7`,
      height: '8px',
      width: '8px',
      borderRadius: '50%',
      border: '.1px solid #999'
    }

    if (video.downloadProgress === 'downloading') {
      light.backgroundColor = 'yellow';
    } else if (video.downloadProgress === 'done') {
      light.backgroundColor = 'lightgreen';
    } else {
      light.backgroundColor = 'grey'
    }

    const sendlessonData = (e) => {
      props.downloadIndVid(e, parseInt(props.lessonData.lessonNumber) - 1, parseInt(i), video.name);
    }

    contents.push(
      <div onClick={ selectVideo } key={ i } style={ videoTitle }>
        <span key={ `${i}-individual` } id={ video.name } style={ dlSingle } onClick={ sendlessonData }>
          <span style={ light }></span>
        </span>
        <span>{ video.title }</span>
        <span style={ dlPrompt }>{ video.downloadProgress === 'downloading' ? 'loading...' : '' }</span>
        <span style={ abs }>
          <span style={ download }>
            <span style={ complete }></span>
          </span>
        </span>
      </div>
    )
  });

  const grabAllVideoNames = (e) => {
    // function videoNames() {
    //   const allVideoNames = []; 
    //   //console.log(lessons[0].props.lessonData.videos)
    //   props.lessonData.videos.forEach((video, i) => {
    //     allVideoNames.push(video.name)
    //   })
    //   // console.log('this is the array allVideoNames' , allVideoNames)
    //   return allVideoNames;
    // }
    props.downloadAllLessson(e, props.lessonData);
  }

  return (
      <div style={ lesson }> 
        <div style={ lessonTitle } onClick={ () => props.expandLesson(props.lessonData) }>
       
          <span style={ titleText }>{ props.lessonData.name }</span>
          <span style={ groupProgress }> {props.lessonData.videosComplete} of {props.lessonData.videosQuantity} watched</span>

          

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

const dlPrompt = {
  color: 'grey',
  fontStyle: 'italic',
  marginLeft: '4px'
}

const dlSingle = {
  fontSize: '10px',
  margin: '10px'

}
const downloadIndy = {
  position: 'absolute',
  left: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '30px',
  ':hover': {
    span: {
      backgroundColor: 'blue'
    }
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
  transition: 'all .2s ease',
  ':hover': {
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
  display: 'flex',
  alignItems: 'center',
  overflowY: 'auto',
  color: 'white',
  height: '35px',
	padding: '0px 70px 0px 35px',
	listStyle: 'none',
  position: 'relative',
  transition: 'all .1s ease',
  ':hover': {
    backgroundColor: 'dodgerblue',
  }
}

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
  position: 'absolute',
  right: '10px',
}

export default Radium(Lesson);