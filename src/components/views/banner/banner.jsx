import React, { Component } from 'react';
import Radium from 'radium';
import logoWhite from './../../../assets/veritas-logo-white.png';

const Banner = (props) => {
  return (
    <div style={ banner }>
      <div style={ titles }>
        <div style={ title }>{ props.lessonData.videoTitle }</div>
        <div style={ subtitle }>{ props.lessonData.lessonName }</div>
      </div>
      <div style={ greeting } key="loggerKey" onClick={ props.logger }>Logout</div>
    </div>
  );
};


const titles = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  flexGrow: '1',
  zIndex: '2',
  opacity: '.7',
}

const title = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.4em',
  color: '#444',
  height: '40px',
  padding: '0 15px',
  borderRight: '2px solid #EAEAEA'
}

const subtitle = {
  display: 'flex',
  alignItems: 'center',

  fontSize: '.8em',
  color: '#9A9A9A',
  fontStyle: 'italic',
  height: '40px',
  padding: '0 15px'
}

const banner = {
  position: 'absolute',
  width: '100%',
  top: '0',
  left: '0',
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
  fontSize: '1em',
  fontWeight: 'light',
  height: '100%',
  color: '#999999',
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  ':hover': {
    color: 'red',
    cursor: 'pointer'
  }
}

const logo = {
  height: '100%',
  width: '300px',
  backgroundImage: `url(${ logoWhite })`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}

export default Radium(Banner);

