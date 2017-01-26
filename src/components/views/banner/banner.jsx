import React, { Component } from 'react';
import Radium from 'radium';
import logoWhite from './../../../assets/veritas-logo-white.png';

const Banner = (props) => {
  return (
    <div style={ banner }>
      <span style={ text }>{ props.lessonData.lessonName } | { props.lessonData.videoTitle }</span>
      <span style={ greeting }>{ props.user ? `Hello ${props.user}` : "Dev Mode" }</span>
    </div>
  );
};

const text = {
  fontSize: '1.4em',
  color: '#999999',
  marginLeft: '20px'
}

const banner = {
  backgroundColor: '#FAFAFA',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'black',
  height: '89px',
  borderBottomStyle: 'solid',
  borderBottomWidth: '2px',
  borderBottomColor: '#EAEAEA',
}

const greeting = {
  color: '#999999',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '20px'
}

const logo = {
  height: '100%',
  width: '300px',
  backgroundImage: `url(${ logoWhite })`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}

export default Radium(Banner);

