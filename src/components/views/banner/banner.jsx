import React, { Component } from 'react';
import Radium from 'radium';
import logoWhite from './../../../assets/veritas-logo-white.png';

const Banner = (props) => {
  console.log(props.user);
  return (
    <div style={ banner }>
      <span style={ logo }></span>
      <span style={ greeting }>Hello, { props.user }!</span>
    </div>
  );
};

const banner = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: 'white',
  backgroundColor: '#131544',
  height: '56px',
}

const greeting = {
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

