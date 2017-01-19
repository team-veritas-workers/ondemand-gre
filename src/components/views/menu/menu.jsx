import React, { Component } from 'react';
import Radium from 'radium';
import Lesson from './lesson.jsx';

const Menu = (props) => {
  return (

      <nav style={menu}>
        <ul>
          <li><a href="#">Foundations of GRE Logic</a></li>
          <li><a href="#">Arithmetic</a></li>
          <li><a href="#">Text Completion and Sentence Equivalence</a>
            <li><a href="#">Algebra</a></li>
            <li><a href="#">Arithmetic</a></li>
            <li><a href="#">Critical Reasoning</a></li>
            <li><a href="#">Geometry and Statistics</a></li>
            <li><a href="#">Word Problems and Data Analysis</a></li>
            <li><a href="#">Analytical Writing Measure</a></li>
            <li><a href="#">Quantitative Strategy</a></li>
            <ul>
              <li><a href="#">Photoshop</a></li>
              <li><a href="#">Illustrator</a></li>
              <li><a href="#">Web Design</a>
                <ul>
                  <li><a href="#">HTML</a></li>
                  <li><a href="#">CSS</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>


      );
}





const menu = {
  backgroundColor: '#111539',
  width: '25%',
  minWidth: '225px',
 
};

const lesson = {
  width: '100%',
  backgroundcolor: '#111539',
  color: 'white',
}

const ulStyle = {
  backgroundColor: '#A1A2A0',
  color: 'white',
  height: '20px',
  
}


// import React, {Component} from 'react';
// import Radium from 'radium';

// const Menu = (props) => {
//   return (
//     <div style={ menu }>
//       <ul style={ ulStyle } key='boob' onClick={ props.toggle }>
//         <li>Lesson 1</li>
//         <li>1</li>
//         <li>2</li>
//         <li>3</li>
//       </ul>
//       <ul style={ ulStyle } key='poop' onClick={ props.toggle }>
//         <li>Lesson 2</li>
//         <li>1</li>
//         <li>2</li>
//         <li>3</li>
//       </ul>
//     </div>
//   );
// };

// const menu = {
//   backgroundColor: '#2F3241',
//   width: '25%',
//   minWidth: '225px'
// };

// const ulStyle = {
//   backgroundColor: '#A1A2A0',
//   color: '#FFF',
//   height: '20px',
//   overflow: 'hidden',
// }

// export default Radium(Menu);


export default Radium(Menu);

