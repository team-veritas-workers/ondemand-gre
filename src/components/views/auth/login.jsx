import React, { Component } from 'react';
import Radium from 'radium';
import logo from '../../../assets/hi-def-logo.png';

const Login = (props) => {
  return (
    <div style={ wrapper }>
      <div style={ container }>
        <img height="auto" width="100%" className='logo' src={ logo } />
        <h5 style={ invalid }>{ props.invalidLoginMessage }</h5>
        <form onKeyPress={ props.authenticate }>
          <input key="username" style={ input } id='username' onChange={ props.usernameOnChange } type='text' placeholder='Username'></input>
          <input key="password" style={ input } id='password' onChange={ props.passwordOnChange } type='password' placeholder='Password'></input>
          <button style={ button } onClick={ props.authenticate }>Log in</button>
        </form>
        <p style={ p }>New User? <a key="signup" href="https://gmat-on-demand-app.veritasprep.com/checkout/LIBRARY/auth/AEntry.php" style={ signup } target="new">Sign up here.</a></p>
      </div>
    </div>
  );
};

const wrapper = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '-10%'
}

const invalid = {
  color: 'red',
  fontWeight: '100',
  marginBottom: '10px'
}

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
  outline: 'none',
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

const signup = {
  textDecoration: 'none',
  ':hover': {
    color: 'red'
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