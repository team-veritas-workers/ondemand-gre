import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';

const Menu = (props) => {
	console.log(props);
	const lessons = [];
	if (props.videoData) {
		props.videoData.forEach((lesson, i) => {
			lessons.push(<Lesson playVideo={ props.playVideo } lessonData={ lesson } id={ i } key={ i }/>)
		});
	}
  return (
    <div style={ menu }>
			{ lessons }
    </div>
  );
}

const menu = {
  backgroundColor: '#111539',
  minWidth: '445px',
	overflow: 'auto'
};

export default Radium(Menu);

