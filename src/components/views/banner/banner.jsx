import React, { Component } from 'react';
import Radium from 'radium';
import logoWhite from './../../../assets/veritas-logo-white.png';

const Banner = () => {
  return (
    <div style={ banner }>
      <div style={ logo }></div>
    </div>
  );
};

const banner = {
  color: 'white',
  display: 'flex',
  backgroundColor: '#131544',
  height: '56px',
}

const logo = {
    width: '300px',
    backgroundImage: `url(${ logoWhite })`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
}

export default Radium(Banner);

