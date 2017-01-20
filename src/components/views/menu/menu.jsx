import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';

const Menu = (props) => {
	const lessons = [];
	if (props.videoData) {
		props.videoData.forEach((lesson, i) => {
			lessons.push(<Lesson contentClass={ lesson.open ? 'content content-open' : 'content' } expandLesson={ props.expandLesson } playVideo={ props.playVideo } lessonData={ lesson } id={ i } key={ i }/>)
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
	// overflow: 'auto',
	// fontSize: '.8em',
	'-webkit-box-shadow': '0px 13px 23px -13px rgba(0,0,0,0.5)',
	width: '40em',
	// backgroundColor: 'transparent',
	margin: 'auto',
	marginTop: '5px',
	overflowY: 'scroll',
/*border: 'solid red',*/
	height: '100vh',
};

export default Radium(Menu);

