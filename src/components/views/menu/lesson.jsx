import React, { Component } from 'react';
import Radium from 'radium';

const Lesson = (props) => {
  // console.log(props);
  const contents = [];
  props.lessonData.videos.forEach((video, i) => {
    contents.push(<div onClick={ props.playVideo } id={ video.name } key={i} style={ thing }>{ video.title }</div>)
  });

  return (
      <div style={ lesson }>
        <div>{ props.lessonData.name }</div>
        <div>{ contents }</div>
      </div>
  );
};

const lesson = {
  color: '#FFF',
  backgroundColor: 'red'
}

const thing = {
  backgroundColor: 'green',
  ':hover': {
    backgroundColor: 'blue',
    cursor: 'pointer',
  }
}

export default Radium(Lesson);