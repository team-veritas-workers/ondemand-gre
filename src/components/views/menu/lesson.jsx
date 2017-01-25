import React, { Component } from 'react';
import Radium from 'radium';

const Lesson = (props) => {
  const contents = [];

  props.lessonData.videos.forEach((video, i) => {
    contents.push(<div onClick={ props.playVideo } id={ video.name } key={i} style={ videoTitle }>{ video.title } <button id={ video.name } onClick={ props.downloadIndVid }>DL</button></div>)
  });

  return (
      <div style={ lesson }>
        <div style={ lessonTitle } onClick={ () => props.expandLesson(props.lessonData) }>
          <span style={ downloadIcon }></span>
          <span style={ titleText }>{ props.lessonData.name }</span></div>
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
  fontSize: '.8em',
}

const lessonTitle = {
  backgroundColor: 'transparent',
  height: '40px',
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  textAlign: 'left',
  fontWeight: 'lighter',
  paddingLeft: '15px',
  position: 'relative',
  zIndex: '2000',
  borderRadius: '4px',
  transition: 'all .4s ease',
  ':hover': {
    cursor: 'pointer',
    color: 'black',
    backgroundColor: 'rgba(180, 180, 200, 1)'
  }
}

const downloadIcon = {
  height: '13px',
  backgroundSize: '13px, 13px',
  backgroundImage: `url(http://files.softicons.com/download/application-icons/ios7-style-icons-by-matias-melian/png/256x256/DownloadsFolder.png)`,
  backgroundRepeat: 'no-repeat',
  paddingLeft: '20px',
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
  overflow: 'auto',
}

const lessonContentTextOpen = {
  overflow: 'auto',
  visibility: 'visible',
  opacity: '1',
  // transition: 'all 1s ease-in',
}

const videoTitle = {
  overflowY: 'scroll',
  color: 'white',
  margin: '-1px',
	padding: '10px 40px 10px 10px',
	listStyle: 'none',
	backgroundImage: 'url("http://www.clipartbest.com/cliparts/9cR/RAd/9cRRAdooi.png")',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'right 10px center',
	backgroundSize: '16px',
  transition: 'all .4s ease',
  ':hover': {
    backgroundColor: 'green',
    cursor: 'pointer',
  }
}

export default Radium(Lesson);