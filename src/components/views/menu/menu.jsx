import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';
import logoWhite from './../../../assets/veritas-logo-white.png';


const Menu = (props) => {
	let lessons;
	if (props.videoData) {
		lessons = props.videoData.map((lesson, i) => {
			return (
				<Lesson setCurrentVideo={ props.setCurrentVideo } open={ lesson.open } contentClass={ lesson.open ? 'content content-open' : 'content' } contentTextStyle={ lesson.open ? 'content-text content-text-open' : 'content-text' } expandLesson={ props.expandLesson } loadVideo={ props.loadVideo } lessonData={ lesson } id={ i } key={ i }/>
			);
		});
	}
  return (
		<div style={ props.showMenu ? menu : menuHide }>
			<div style={ options }>
				<img width="100%" height="auto" src={ logoWhite } />
				<span style={ user }>{ props.user ? props.user : "Dev Mode" }</span>
			</div>
			{ lessons }
    </div>
  );
}

const user = {
	marginLeft: '10px'
}

const options = {
	padding: '15px',
	margin: '-5px -5px 15px -5px',
	color: '#999',
	':hover': {
		backgroundColor: 'rgba(255, 255, 255, .1)',
		color: 'white',
	}
}

const menu = {
	width: '480px',
  backgroundColor: '#111539',
	padding: '5px',
	overflowY: 'scroll',
	height: '100vh',
	boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
	zIndex: '2',
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

