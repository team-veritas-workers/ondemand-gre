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
  backgroundColor: '#111539',
  height: '95px',
  color: 'white'
}

const logo = {
   width: '600px',
   height: '100%',
   backgroundImage: `url(${ logoWhite })`,
   backgroundSize: 'cover'
}

export default Radium(Banner);


