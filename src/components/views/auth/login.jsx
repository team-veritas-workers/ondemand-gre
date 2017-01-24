import React, { Component } from 'react';

const Login = (props) => {
  return (
    <div style={ container }>
      <img height="auto" width="250px" className='logo' src={ require('../../../assets/hi-def-logo.png') } />
      <h4>Log in!</h4>
      <h5 id="invalid"></h5>
      <form>
        <input id='username' type='text' placeholder='username'></input>
        <input id='password' type='password' placeholder='Password'></input>
        <button onClick={ props.authenticate }>Log in</button>
      </form>
      <p>New User? <a href="https://gmat-on-demand-app.veritasprep.com/checkout/LIBRARY/auth/AEntry.php" target="new">Sign up here.</a></p>
    </div>
  );
};

const container = {
  width: '250pxd',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignSelf: 'center',
  textAlign: 'center'
}

export default Login;