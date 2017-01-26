import React, { Component } from 'react';
import Radium from 'radium';

const Login = (props) => {

  
  
  return (
    <div style={ container }>
      <img height="auto" width="100%" className='logo' src={ require('../../../assets/hi-def-logo.png') } />
      <h5 id="invalid"></h5>
      <form>
        <input key="username" style={ input } id='username' type='text' placeholder='Username'></input>
        <input key="password" style={ input } id='password' type='password' placeholder='Password'></input>
        <button style={ button } onClick={ props.authenticate }>Log in</button>
      </form>
      <p style={ p }>New User? <a href="https://gmat-on-demand-app.veritasprep.com/checkout/LIBRARY/auth/AEntry.php" target="new">Sign up here.</a></p>
    </div>
  );
};
const p = {
  marginTop: '10px',
}

const button = {
  color: 'white',
  backgroundColor: '#111539',
  fontSize: '1em',
  borderRadius: '4px',
  borderStyle: 'none',
  width: '100%',
  height: '37px',
  margin: '3px 0',
  ':hover': {
    backgroundColor: '#EAEAEA',
    color: 'black'
  }
}

const input = {
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '#EAEAEA',
  fontSize: '1em',
  width: '100%',
  height: '37px',
  outline: 'none',
  padding: '4px',
  margin: '3px 0',
  transition: 'all .3s ease',
  ':hover': {
    borderColor: '#ACACAC'
  }
}

const container = {
  borderRadius: '4px',
  marginTop: '45px',
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignSelf: 'center',
  textAlign: 'center'
}

export default Radium(Login);