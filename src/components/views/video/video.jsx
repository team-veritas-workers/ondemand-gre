import React, { Component } from 'react';
import me from './../../../assets/maxresdefault.jpg';


const Video = () => {
  return (
    <div>
      <div style={ VideoImg }></div>
      <div style={ video }></div>
    </div>
  );
};

const video = {
  backgroundColor: 'white',
  width: '100%'
}

const VideoImg = {
   width: '700px',
   height: '40%',
   backgroundImage: `url(${ me })`,
   backgroundSize: 'cover'
}
export default Video;