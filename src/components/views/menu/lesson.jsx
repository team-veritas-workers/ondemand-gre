import React, { Component } from 'react';
import Radium from 'radium';
import dlIcon from './../../../assets/dl_icon.png';
import dlIconHover from './../../../assets/dl_icon_hover.png';
import PieChart from 'react-simple-pie-chart';

const Lesson = (props) => {
  console.log('props...', props.lessonData.videos)
  const contents = [];
  props.lessonData.videos.forEach((video, i) => {

    const selectVideo = (e) => {
      props.setCurrentVideo(video, props.lessonData);
    };

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

    // const complete = {
    //   display: 'inline-block',
    //   position: 'absolute',
    //   backgroundColor: `${ video.length === 100 ? 'lightgreen' : 'yellow' }`,
    //   height: '100%',
    //   width: `${ video.length ? video.length : '0' }%`,
    // };
    
    // const light = {
    //   display: 'inline-block',
    //   opacity: `1`,
    //   backgroundColor: `${ video.downloaded ? 'lightgreen' : 'grey' }`,
    //   height: '8px',
    //   width: '8px',
    //   borderRadius: '50%',
    //   border: '.1px solid #999',
    // }

    // if (video.downloadProgress && video.downloadProgress === 'downloading') {
    //   light.backgroundColor = 'yellow';
    // } 
    // else if (video.downloadProgress && video.downloadProgress === 'done') {
    //   light.backgroundColor = 'lightgreen';
    // }

    // if (!video.downloaded && video.downloadProgress !== 'downloading') {
    //   downloadButton.pointerEvents = 'auto',
    //   downloadButton[':hover'] = {
    //     opacity: '1',
    //     backgroundColor: 'lightgreen',
    //   }
    // } 
    // else if (video.downloadProgress && video.downloadProgress === 'done') {
    //   downloadButton.pointerEvents = 'auto',
    //   downloadButton[':hover'] = {
    //     opacity: '1',
    //     backgroundColor: 'lightgreen',
    //   }
    // }
    // else {
    //   downloadButton.pointerEvents = 'none',
    //   downloadButton[':hover'] = {
    //     opacity: '0',
    //     backgroundColor: 'lightgreen',
    //   }
    // }

    const sendlessonData = (e) => {
      props.downloadIndVid(e, parseInt(props.lessonData.lessonNumber) - 1, parseInt(i), video.name);
    }

    contents.push(
      <div onClick={ selectVideo } key={ i } style={ videoTitle }>
        <span key={ `${i}-individual` } id={ video.name } style={ dlSingle } onClick={ sendlessonData }>
          <span key={ `${video.name}Button` } style={ downloadButton }><img src={ dlIconHover } style={ downloadImage } /></span>
          {/*<span style={ light } key={ `${i}${video.name}` }></span>*/}
           <span style={ ppie1 }>
          <PieChart slices={[
                    {
                      color: 'gray',
                      value: 100 - video.length || 0,
                    },
                    {
                      color: 'white',
                      value: 100,
                    },
                  ]}/>
                  </span>
        </span>
        <span style={ videoName }>{ video.title }</span>
        <span style={length}>{video.duration}</span>
        <span style={ dlPrompt }>{ video.downloadProgress === 'downloading' ? 'downloading..' : '' }</span>
        <span style={ abs }>
          {/*<span style={ download }>
            <span style={ complete }></span>
          </span>*/}
        </span>
      </div>
    )
  });

  const grabAllVideoNames = (e) => {
    props.downloadAllLessson(e, props.lessonData);
  }

  return (
      <div style={ lesson }> 
        <div style={ lessonTitle } key="lessonTitle" onClick={ () => props.expandLesson(props.lessonData) }>
          <span style={ titleText }>{ props.lessonData.name }</span>
          <span style={ downloadIcon } onClick={ grabAllVideoNames } key="downloadIcon"></span>

          <div style={ ppie }>
              <PieChart slices={ slices(props) }/>
          </div>

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

const downloadImage = {
  height: '65%'
}

const videoName = {
  marginRight: '50px',
}

const length = {
  position: 'absolute',
  right: '90px',
  fontSize: '10px',
}

const slices = (props) => [
    { color: 'rgba(225, 225, 255, .5)', value: 100 - props.lessonData.lessonGroupProgress },
    { color: 'rgba(255, 255, 255, 1)', value: props.lessonData.lessonGroupProgress }
];

  
const ppie = {
  position: 'absolute',
  right: '10px',
  height:'100%',
  width: '28px',
  marginTop: '6px'

}

const ppie1 = {
  position: 'absolute',
  right: '5px',
  height:'18px',
  width: '18px',
  margin: '5px'
}

const dlPrompt = {
  color: 'grey',
  fontStyle: 'italic',
  marginLeft: '4px'
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
    color: '#888',
    backgroundColor: '#EAEAEA',
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