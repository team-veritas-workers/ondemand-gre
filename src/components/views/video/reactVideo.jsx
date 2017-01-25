import React, { Component } from 'react';
import Video from 'react-h5-video';


const Vid = () => {
  return (
    <Video sources={sources} height="auto" width="80%">
			<h3 className="video-logo pull-right"><a href="http://glexe.com" target="_blank">LOGO</a></h3>
			<p>Any HTML content</p>
		</Video>
  );
}

const sources = ['https://gre-on-demand.veritasprep.com/gre_1_1.mp4'];

const styles = {

}

export default Vid;