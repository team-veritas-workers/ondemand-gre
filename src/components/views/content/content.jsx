import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/video.jsx';
import Login from './../auth/login.jsx'
import electron, {ipcRenderer} from 'electron'


const Content = (props) => {

	  return (
    <div style={ container }>
    

      <Menu user={ props.user } setCurrentVideo={ props.setCurrentVideo } downloadIndVid={ props.downloadIndVid } videoData={ props.videoData } loadVideo={ props.loadVideo } expandLesson={ props.expandLesson } showMenu={ props.showMenu } />
      <Video logOutStuff={props.logger} user={ props.user } toggleMenu={ props.toggleMenu } currentVideo={ props.currentVideo } videoData={ props.videoData }/>
    
      <button onClick={function(){props.logger()}}>Logout</button>
    </div>
  );



};

const container = {
  display: 'flex',
  flexDirection: 'row',
  flex: '2',
}

export default Content;