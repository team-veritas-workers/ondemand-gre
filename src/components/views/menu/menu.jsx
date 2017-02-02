import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';
import logoWhite from './../../../assets/veritas-logo-white.png';


const Menu = (props) => {

	if (props.videoData) {
		for (let i = 0; i < props.videoData.length; i++) {
			//here I am giving each lesson group props based on how many videos
			//is in each group and how many of those have been watched
			props.videoData[i].videosQuantity = props.videoData[i].videos.length;
			props.videoData[i].videosComplete = 0;
			for (let j = 0; j < props.videoData[i].videos.length; j++) {
				if (props.progress[props.videoData[i].videos[j].name]) {
					props.videoData[i].videos[j].length = props.progress[props.videoData[i].videos[j].name];

					if (props.videoData[i].videos[j].length === 100) {
						props.videoData[i].videosComplete++;
					}
				}
			}
			//calculating the lesson group percentage complete and then making that a prop to
			//pass down to lesson
			for (let i = 0; i < props.videoData.length; i++) {
				props.videoData[i].lessonGroupProgress = Math.round(100 * props.videoData[i].videosComplete/props.videoData[i].videosQuantity);
			}
		}
	}	
	
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

