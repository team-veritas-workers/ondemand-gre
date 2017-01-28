import React, { Component } from 'react';
import Menu from './../menu/menu.jsx';
import Video from './../video/reactVideo.jsx';
import Login from './../auth/login.jsx'
import electron, {ipcRenderer} from 'electron'

const Content = (props) => {
  const { url, playVideo, user, setCurrentVideo, downloadIndVid, videoData, expandLesson, showMenu, logger, toggleMenu, currentVideo } = props;
  return (
  <div style={ container }>
    <Menu
      user = { user }
      setCurrentVideo = { setCurrentVideo }
      downloadIndVid = { downloadIndVid }
      videoData = { videoData }
      playVideo = { playVideo }
      expandLesson = { expandLesson }
      showMenu = { showMenu } />
    <Video
      logOutStuff = {logger}
      user = { user }
      toggleMenu = { toggleMenu }
      currentVideo = { currentVideo }
      videoData = { videoData }
      url = { url }
    />
  </div>
  );
};

const container = {
  backgroundColor: 'blue',
  display: 'flex',
  flexDirection: 'row',
  flex: '2',
  width: '100%',
  minWidth: '1000px'
}

export default Content;