import React, { Component } from 'react';
import Radium from 'radium';

const Lesson = (props) => {
  const videos = [];
  return (
    <div style={ lessonTitle }>
      <span>{ props.lessonData.name }</span>
    </div>
  );
};

const lessonTitle = {
  alignItems: 'center',
  backgroundColor: '#131544',
  color: '#FFF',
  display: 'flex',
  height: '29px',
  overflow: 'hidden',
  paddingLeft: '5px',
  ':hover': {
    backgroundColor: '#EAEAEA',
    color: '#333'
  }
}

export default Radium(Lesson);