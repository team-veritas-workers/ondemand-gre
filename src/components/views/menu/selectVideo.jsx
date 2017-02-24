import React from 'react';
import Radium from 'radium';
import dlIconHover from './../../../assets/dl_icon_hover.png';
import PieChart from 'react-simple-pie-chart';
import fullCircle from './../../../assets/complete.png';

const SelectVideo = (props) => {

  if (props.lessonData.name === 'Quantitative Strategy') {
    console.log(props.lessonData)
  };

  const selectVideo = (e) => props.setCurrentVideo(props.videoData, props.lessonData);
  const sendlessonData = (e) => props.downloadIndVid(e, parseInt(props.lessonData.lessonNumber) - 1, parseInt(props.id), props.videoData.name);

  const complete = {
    position: 'absolute',
    opacity: `${ props.videoData.length === 100 ? 1 : 0 }`,
    size: '40px'
  };

  const slices = (props) => {
    if (props.videoData.length === 100) {
      return [{ color: 'rgba(255, 255, 255, 0)', value: 100 }, { color: 'rgba(255, 255, 255, 0)', value: 100 }];
    } else {
      return [{ color: 'gray', value: 100 - props.videoData.length || 0 }, { color: 'white', value: 100 }]
    }
  }

  return (
    <div onClick={ selectVideo } key={ props.id } style={ title }>
      {/* DOWNLOAD INDIVIDUAL BUTTON
      <span key={ `${ props.id }-individual` } id={ props.videoData.name } style={ dlSingle } onClick={ sendlessonData }>
        <span key={ `${ props.videoData.name }Button` } style={ downloadButton }><img src={ dlIconHover } style={ downloadImage } /></span>
      </span>
      */}
      <span style={ videoName }>{ props.videoData.title }</span>
      <span style={ length }>{ props.videoData.duration }</span>
      <span style={ dlPrompt }>{ props.videoData.downloadProgress === 'downloading' ? 'downloading..' : '' }</span>
      <span style={ progressWheel }>
        <img width="auto" height="22px" style={ complete } src={ fullCircle } />
        <PieChart slices={ slices(props) }/>
      </span>
    </div>
  )
};

const title = {
  display: 'flex',
  alignItems: 'center',
  overflowY: 'auto',
  color: 'white',
  height: '35px',
	padding: '0px 70px 0px 10px',
	listStyle: 'none',
  position: 'relative',
  transition: 'all .1s ease',
  ':hover': {
    color: '#FFF',
    // backgroundColor: '#e45c00',
    backgroundColor: 'dodgerblue'
  }
}

const dlSingle = {
  overflow: 'hidden',
  position: 'absolute',
  left: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '30px',
  pointerEvents: 'none'
}

const downloadButton = {
  backgroundColor: 'green',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: '0',
  height: '100%',
  width: '100%',
  opacity: '0',
  pointerEvents: 'none'
}

const downloadImage = {
  backgroundColor: 'purple',
  height: '65%'
}

const videoName = {
  marginRight: '50px',
}

const length = {
  position: 'absolute',
  right: '40px',
  fontSize: '.8em',
}

const dlPrompt = {
  color: 'grey',
  fontStyle: 'italic',
  marginLeft: '4px'
}

const progressWheel = {
  position: 'absolute',
  right: '12px',
  height:'22px',
  width: '22px',
}

export default Radium(SelectVideo);