import React, { Component } from 'react';
import Radium from 'radium';

const Lesson = (props) => {
  // console.log(props);
  const contents = [];
  props.lessonData.videos.forEach((video, i) => {
    contents.push(<div onClick={ props.playVideo } id={ video.name } key={i} style={ videoTitle }>{ video.title }</div>)
  });
  console.log('LESSON', props);

  return (
      <div style={ lesson }>
        <div className="title">
          <span style={ thing2 }></span>
          <span className="title-text" onClick={ () => props.expandLesson(props.lessonData) }>{ props.lessonData.name }</span></div>
        <div className={ props.contentClass } style={ contentStyle }>
          <div className="content-text content-text-open">
            { contents }
          </div>
        </div>
      </div>
  );
};

const lesson = {

}

const videoTitle = {
  overflowY: 'scroll',
  maxWidth: '600px',
  color: 'white',
  ':hover': {
    backgroundColor: 'red'
  }
}

const thing2 = {
   backgroundSize: '18px, 18px',
  // backgroundSize: '15px, 15px',
  backgroundImage: `url(http://files.softicons.com/download/application-icons/ios7-style-icons-by-matias-melian/png/256x256/DownloadsFolder.png)`,
  // backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  paddingLeft: '30px',
}

const contentStyle = {

}

export default Radium(Lesson);