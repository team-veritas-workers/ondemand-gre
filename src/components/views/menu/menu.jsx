import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';

const Menu = (props) => {
	let lessons;
	if (props.videoData) {
		lessons = props.videoData.map((lesson, i) => {
			return (
				<Lesson open={ lesson.open } contentClass={ lesson.open ? 'content content-open' : 'content' } contentTextStyle={ lesson.open ? 'content-text content-text-open' : 'content-text' } expandLesson={ props.expandLesson } playVideo={ props.playVideo } lessonData={ lesson } id={ i } key={ i } downloadIndVid= { props.downloadIndVid }/>
			);
		});
	}
  return (
		<div style={ props.showMenu ? menu : menuHide }>
			{ lessons }
    </div>
  );
}

const menu = {
	width: '480px',
  backgroundColor: '#111539',
	padding: '5px',
	overflowY: 'scroll',
	height: '100vh',
	boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
	zIndex: '1',
	transition: 'all .4s ease',
};

const menuHide = {
	width: '0px',
  backgroundColor: '#111539',
	padding: '5px',
	overflowY: 'scroll',
	height: '100vh',
	boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
	zIndex: '1',
	transition: 'all .5s ease-in',
};

export default Radium(Menu);

