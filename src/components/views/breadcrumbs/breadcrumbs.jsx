import React, { Component } from 'react';

const Breadcrumbs = () => {
  return (
  
      <div style={ breadcrumbs }>
          <button style={hamburger}>&#9776;</button>
        
      
      </div>
 
  );
};

const breadcrumbs = {
  display: 'flex',
  height: '40px',
  backgroundColor: '#EAEAEA',
}

const hamburger = {
  background:'none',
  position:'absolute',
  
  left:'0',
  lineHeight:'45px',

  // padding:5px 15px 0px 15px,
  color:'black',
  border:'0',
  fontSize:'1.9em',
  fontWeight:'bold',
  cursor:'pointer',
  outline:'none',
  zIndex:'10000000000000',
}

export default Breadcrumbs;