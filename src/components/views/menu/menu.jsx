import React, { Component } from 'react';
import Lesson from './lesson.jsx';
import Radium from 'radium';

const Menu = (props) => {
  const lessons = [];
  if (props.videoData) {
    props.videoData.forEach((lesson, i) => {
      lessons.push(<Lesson key={i} lessonData={ lesson }/>)
    })
  }
  return (
    <div style={ menu }>
      { lessons }
    </div>
  );
};

const menu = {
  backgroundColor: '#131544',
  width: '30%',
  minWidth: '300px',
  maxWidth: '350px',
};

export default Radium(Menu);