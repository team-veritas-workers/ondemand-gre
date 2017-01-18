import React, { Component } from 'react';
import Radium from 'radium';

const Banner = () => {
  return (
    <div style={ banner }>Hi!</div>
  );
};

const banner = {
  backgroundColor: 'red',
  height: '56px',
}

export default Radium(Banner);