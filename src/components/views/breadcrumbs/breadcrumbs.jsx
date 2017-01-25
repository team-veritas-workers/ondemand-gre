import React, { Component } from 'react';
import Radium from 'radium';

const Breadcrumbs = (props) => {
  return (
    <div style={ breadcrumbs }>
      <button onClick={ props.toggleMenu } style={ hamburger }>&#9776;</button>
    </div>
  );
};

const breadcrumbs = {
  boxShadow: '0 3px 10px rgba(0, 0, 0, .2)',
  display: 'flex',
  alignItems: 'center',
  height: '40px',
  backgroundColor: '#EAEAEA',
  zIndex: '2',
  padding: '5px',
}

const hamburger = {
  background: 'none',
  width: '35px',
  height: '35px',
  left: '0',
  color: 'black',
  border: '0',
  fontSize: '1.2em',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    boxShadow: '0 3px 20px rgba(0, 0, 0, .1)',
  }
}

export default Radium(Breadcrumbs);