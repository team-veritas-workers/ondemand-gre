import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';
import logoWhite from './../../../assets/veritas-logo-white.png';


const Menu = (props) => {
	if (props.videoData) {
		for (let i = 0; i < props.videoData.length; i++){
			for (let j = 0; j < props.videoData[i].videos.length; j++)
			
			//console.log("videos",props.videoData[i].videos[j].name);
			if (props.progress[props.videoData[i].videos[j].name]){
				
				props.videoData[i].videos[j].length = props.progress[props.videoData[i].videos[j].name];
				console.log("video with new prop", props.videoData[i].videos[j])

			}
		}
	}

	let lessons;
	if (props.videoData) {
		lessons = props.videoData.map((lesson, i) => {
			return (
				<Lesson progress={props.progress} setCurrentVideo={ props.setCurrentVideo } open={ lesson.open } contentClass={ lesson.open ? 'content content-open' : 'content' } contentTextStyle={ lesson.open ? 'content-text content-text-open' : 'content-text' } expandLesson={ props.expandLesson } lessonData={ lesson } id={ i } key={ i } downloadAllLessson={ props.downloadAllLessson } downloadIndVid= { props.downloadIndVid }/>
			);
		});
	}
  return (
		<div style={ props.showMenu ? menu : menuHide }>
			<div style={ options }>
				<img width="100%" height="auto" src={ logoWhite } />
			</div>
			<div style={ lessonsContentBox }>
				{ lessons }
			</div>
    </div>
  );
}

const lessonsContentBox = {
	padding: '0',
	margin: '0',
	height: '100%',
	width: '100%',
	overflow: 'scroll',
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
	width: '500px',
	minWidth: '390px',
	backgroundColor: '#111539',
	padding: '5px',
	overflowY: 'hidden',
	height: '100vh',
	boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
	zIndex: '2',
	transition: 'all .4s ease',
};

const menuHide = {
	width: '0px',
  backgroundColor: '#111539',
	padding: '5px',
	overflowY: 'auto',
	height: '100vh',
	boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
	zIndex: '1',
	transition: 'all .5s ease-in',
};

export default Radium(Menu);

