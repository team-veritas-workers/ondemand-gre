import React, { Component } from 'react';

const Menu = () => {
  return (
    <div style={ menu }>

      <ul>
        <li>Foundations of GRE Logic</li>
        <li>Arithmetic</li>
        <li>Text Completion and Sentence Equivalence</li>
        <li>Algebra</li>
        <li>Critical Reasoning</li>
        <li>Geometry and Statistics</li>
        <li>Reading Comprehension</li>
        <li>Word Problems and Data Analysis</li>
        <li>Analytical Writing Measure</li>
        <li>Quantitative Strategy</li>
        
      </ul>
    
    
    </div>

  );
};

const menu = {
  backgroundColor: 'dodgerblue',
  width: '25%',
  minWidth: '225px'

};



let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuActive: false
    };
  }

  toggleMenu() {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      menu = <div>
                <ul>
                  <li>First Item </li>
                  <li>Second Item </li>
                  <li>Third Item </li>
                </ul>
              </div>
    } else {
      menu = "";
    }
    return (
      <div id = "menu">
        <i className = "fa fa-plus" onClick = { this.toggleMenu }/>
      <ReactCSSTransitionGroup transitionName = "menu" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        {menu}
      </ReactCSSTransitionGroup>
    </div>
    )
  
}

ReactDOM.render(
  <DropDown />,
    document.getElementById('menuContainer')
);





















export default Menu;