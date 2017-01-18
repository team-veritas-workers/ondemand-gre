import React, { Component } from 'react';
import { render } from 'react-dom';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';
import Menu from './../views/menu/menu.jsx';
import Video from './../views/video/video.jsx';
import Accordion from './../views/menu/accordion.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggle =this.toggle.bind(this);
    this.state = {


    };
  }

toggle(e) {

  console.log(e.target.style)
}

  render() {
      let data = [
        {
        title: "Foundations of GRE Logic", 
        content: <div style={me}>
        
        <li>poop</li>
        <li>poop</li>
        
        </div>,
        
      }, {
        title: "Arithmetic", 
        content: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.`
      },{
        title: "Text Completion and Sentence Equivalence", 
        content: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.`
      }
    ];
    
    return (
      <div style={ app }>
        <Banner />
        
        <Breadcrumbs />
        <div style={ container }>
          <Accordion data={data} />
          
          <Video />
        </div>
      </div>
    )
  }
}

const app = {
  display: 'flex',
  flexDirection: 'column',
};

const container = {
  backgroundColor: '#111539',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '800px',
}
const me = {
  listStyle: 'none',
}
