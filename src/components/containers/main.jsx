import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import './../../stylesheets/main.css';

const Main = () => {
  return (
    <div>
      <App />
    </div>
  );
};

render(<Main />, document.getElementById('app'));