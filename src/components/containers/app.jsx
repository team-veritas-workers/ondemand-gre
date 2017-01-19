import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Banner from './../views/banner/banner.jsx';
import Nav from './../views/nav/nav.jsx';
import Breadcrumbs from './../views/breadcrumbs/breadcrumbs.jsx';

import Menu from './../views/menu/menu.jsx';
import Video from './../views/video/video.jsx';
import Accordion from './../views/menu/accordion.jsx';

import Content from './../views/content/content.jsx';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.getVideoData = this.getVideoData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }

  getVideoData() {
    // AXIOS NOT WORKING, USE JQUERY FOR NOW
    const URL = 'https://www.veritasprep.com/api/desktop-app/get_playlist.php';
    const body = { type: 'desktop', account: 'GRE' };

    $.post(URL, body)
    .then(res => {
      this.setState({ videoData: JSON.parse(res) });
    })
    .catch(err => console.log(err));
  }

  toggle(e) {
    const that = e.target.style;
    console.log(that);
  }

  componentDidMount() {
    this.getVideoData();
  }


  render() {

    let fatArr = [{"name":"Foundations of GRE Logic","lessonNumber":"1","description":"Build the core GMAT skills and understand what the test measures","videos":[{"name":"gre_intro","title":"GRE Intro","duration":"1 min"},{"name":"gre_1_1","title":"Foundations of GRE","duration":"9 min"},{"name":"gre_1_2","title":"Think Like the Testmaker","duration":"3 min"},{"name":"gre_1_3","title":"Test Format, Scoring","duration":"3 min"},{"name":"gre_1_4","title":"Question Types - GRE Verbal","duration":"20 min"},{"name":"gre_1_5","title":"GRE Quantitative","duration":"19 min"},{"name":"gre_1_6_0","title":"GRE Logic","duration":"28 min"},{"name":"gre_1_6_1","title":"More on GRE Logic","duration":"28 min"},{"duration":"6 min","title":"Lesson Summary","name":"gre_1_6_1"}]},{"name":"Arithmetic","lessonNumber":"2","description":"Master the trickiest subjects, reducing unnecessary math mistakes","videos":[{"name":"gre_2_1","title":"Arithmetic","duration":"2 min"},{"name":"gre_2_2","title":"Calculations","duration":"15 min"},{"name":"gre_2_3","title":"Combinatorics and Probability, Definitions & Divisions","duration":"6 min"},{"name":"gre_2_4","title":"Percents","duration":"13 min"},{"name":"gre_2_5","title":"Ratios","duration":"9 min"},{"name":"gre_2_6_0","title":"Factors","duration":"26 min"},{"name":"gre_2_6_1","title":"Multiples and the Number Line","duration":"12 min"},{"name":"gre_2_7","title":"Number Properties","duration":"15 min"},{"name":"gre_2_8","title":"You Oughta Know","duration":"15 min"}]},{"name":"Text Completion & Sentence Equivalence","lessonNumber":"3","description":"Enhance your reasoning skills and quickly break down any problem","videos":[{"name":"gre_3_1","title":"Text Completion & Sentence Equivalence","duration":"10 min"},{"name":"gre_3_2","title":"Strategy #1: Focus on Transition Language","duration":"10 min"},{"name":"gre_3_3","title":"Strategy #2: The Whole Sentence Matters","duration":"3 min"},{"name":"gre_3_4","title":"Strategy #3: Fill in the Blanks Yourself","duration":"5 min"},{"name":"gre_3_5","title":"Strategy #4: Fill In The Easiest Blank First","duration":"8 min"},{"name":"gre_3_6","title":"Strategy #5: Use Process of Elimination","duration":"5 min"},{"name":"gre_3_7","title":"Sentence Equivalence: The Basics","duration":"4 min"},{"name":"gre_3_8","title":"Strategy #1: Focus on Transitional language","duration":"2 min"},{"name":"gre_3_9","title":"Strategy #2: Fill In The Blanks Yourself","duration":"1 min"},{"name":"gre_3_10","title":"Strategy #3: Use Process of Elimination","duration":"3 min"},{"name":"gre_3_11","title":"Strategy #4: Beware – Synonymous Words vs. Synonymous Sentences!","duration":"4 min"},{"name":"gre_3_12","title":"Strategy #4a: Your Perfect Word May Not Have A Match","duration":"3 min"},{"name":"gre_3_13","title":"Strategic Summary","duration":"1 min"},{"name":"gre_3_14","title":"Study Habits","duration":"4 min"}]},{"name":"Algebra","lessonNumber":"4","description":"Manipulate equations using these crucial time-saving strategies","videos":[{"name":"gre_4_1","title":"Algebra - An Inconvenient Truth","duration":"6 min"},{"name":"gre_4_2","title":"Multiply by 1","duration":"7 min"},{"name":"gre_4_3","title":"Combine Like Terms","duration":"3 min"},{"name":"gre_4_4","title":"Harder Factoring","duration":"2 min"},{"name":"gre_4_5","title":"Do the Same to Both Sides","duration":"7 min"},{"name":"gre_4_6","title":"Eliminate Variables","duration":"6 min"},{"name":"gre_4_7","title":"Exponents","duration":"11 min"},{"name":"gre_4_8","title":"Common Bases","duration":"3 min"},{"name":"gre_4_9","title":"Create Multiplication","duration":"3 min"},{"name":"gre_4_10","title":"Find Patterns","duration":"3 min"},{"name":"gre_4_11","title":"Roots Are Exponents Too","duration":"6 min"},{"name":"gre_4_12","title":"Numbers Properties","duration":"8 min"},{"name":"gre_4_13","title":"Quadratics","duration":"14 min"},{"name":"gre_4_14","title":"Common Algebraic Equations","duration":"10 min"},{"name":"gre_4_15","title":"Difference of Squares Drill","duration":"6 min"},{"name":"gre_4_16","title":"Inequalities","duration":"9 min"},{"name":"gre_4_17","title":"Functions","duration":"6 min"},{"name":"gre_4_18","title":"Sequences","duration":"7 min"},{"name":"gre_4_19","title":"You Outta Know","duration":"13 min"}]},{"name":"Critical Reasoning","lessonNumber":"5","description":"Avoid common traps and quickly identify what's being tested","videos":[{"name":"gre_5_1","title":"Critical Reasoning","duration":"11 min"},{"name":"gre_5_2","title":"Strenghten and Weaken Questions","duration":"8 min"},{"name":"gre_5_3","title":"Mind the Gap","duration":"9 min"},{"name":"gre_5_4","title":"Common Logical Fallacies","duration":"11 min"},{"name":"gre_5_5","title":"Inference","duration":"16 min"},{"name":"gre_5_6","title":"Method of Reasoning","duration":"5 min"},{"name":"gre_5_7","title":"SWIM Subtypes & Advanced Applications","duration":"19 min"},{"name":"gre_5_8","title":"Summary","duration":"3 min"}]},{"name":"Geometry & Statistics","lessonNumber":"6","description":"Avoid time-wasting traps with these key geometric relationships","videos":[{"name":"gre_6_1","title":"Geometry Basics","duration":"10 min"},{"name":"gre_6_2","title":"Triangles","duration":"14 min"},{"name":"gre_6_3","title":"Quadrilaterals","duration":"6 min"},{"name":"gre_6_4","title":"Circles","duration":"16 min"},{"name":"gre_6_5","title":"Coordinate Geometry","duration":"14 min"},{"name":"gre_6_6","title":"Statistics","duration":"12 min"},{"name":"gre_6_7_0","title":"Combinatorics","duration":"24 min"},{"name":"gre_6_7_1","title":"Probability","duration":"9 min"},{"name":"gre_6_8","title":"You Outta Know","duration":"19 min"}]},{"name":"Reading Comprehension","lessonNumber":"7","description":"Focus only on what matters while improving accuracy and pace","videos":[{"name":"gre_7_1","title":"GRE Reading Comprehension","duration":"4 min"},{"name":"gre_7_2","title":"STOP","duration":"10 min"},{"name":"gre_7_3","title":"Primary Purpose Question","duration":"8 min"},{"name":"gre_7_4","title":"Organization","duration":"2 min"},{"name":"gre_7_5","title":"Inference Question","duration":"6 min"},{"name":"gre_7_6","title":"Question Types","duration":"6 min"},{"name":"gre_7_7","title":"Question Type: Sample Passage","duration":"6 min"},{"name":"gre_7_8","title":"Specific Questions","duration":"1 min"},{"name":"gre_7_9","title":"Inference Questions","duration":"5 min"},{"name":"gre_7_10","title":"Function Questions","duration":"5 min"},{"name":"gre_7_11","title":"Universal Questions","duration":"5 min"},{"name":"gre_7_12","title":"Select All/Inference","duration":"5 min"},{"name":"gre_7_13","title":"Select-In-Passage","duration":"4 min"},{"name":"gre_7_14","title":"More On Inferences","duration":"29 min"},{"name":"gre_7_15","title":"Short, Dense Passages","duration":"18 min"}]},{"name":"Word Problems & Data Analysis","lessonNumber":"8","description":"Deconstruct every problem type, avoiding common logic traps","videos":[{"name":"gre_8_1","title":"Word Problems & Data Analysis","duration":"3 min"},{"name":"gre_8_2","title":"The Problem Solving Toolkit","duration":"18 min"},{"name":"gre_8_3","title":"Use a Mix of Approaches","duration":"4 min"},{"name":"gre_8_4","title":"Mastering Common Word Problems","duration":"11 min"},{"name":"gre_8_5","title":"Weighted Average","duration":"7 min"},{"name":"gre_8_6","title":"Quantitative Comparison","duration":"14 min"},{"name":"gre_8_7","title":"Profit/Revenue/Cost","duration":"5 min"},{"name":"gre_8_8","title":"Data & Graphics Interpretation Introduction","duration":"9 min"},{"name":"gre_8_9","title":"Graphs","duration":"6 min"}]},{"name":"Analytical Writing Measure","lessonNumber":"9","description":"Apply more advanced logic and excel in the hardest problems","videos":[{"name":"gre_9_1","title":"Analytical Writing","duration":"5 min"},{"name":"gre_9_2","title":"The Screen","duration":"4 min"},{"name":"gre_9_3","title":"Brainstorm","duration":"6 min"},{"name":"gre_9_4","title":"Template","duration":"8 min"},{"name":"gre_9_5","title":"Write","duration":"5 min"},{"name":"gre_9_6","title":"An Introduction","duration":"1 min"},{"name":"gre_9_7","title":"Brainstorm","duration":"4 min"},{"name":"gre_9_8","title":"Template","duration":"4 min"},{"name":"gre_9_9","title":"Write","duration":"1 min"},{"name":"gre_9_10","title":"Overall Strategies","duration":"5 min"}]},{"name":"Quantitative Strategy","lessonNumber":"10","description":"Master advanced concepts and valuable time-saving techniques","videos":[{"name":"gre_10_1","title":"Quantitative Strategy","duration":"3 min"},{"name":"gre_10_2","title":"Leverage Every Asset","duration":"1 min"},{"name":"gre_10_3","title":"Take the Hint!","duration":"2 min"},{"name":"gre_10_4","title":"Get Comparable Values","duration":"4 min"},{"name":"gre_10_5","title":"Quantitative Comparison","duration":"2 min"},{"name":"gre_10_6","title":"Multiple Choice, Select One","duration":"16 min"},{"name":"gre_10_7","title":"Numeric Entry","duration":"4 min"},{"name":"gre_10_8","title":"You Know The Answer…But You’d Love To Confirm","duration":"3 min"},{"name":"gre_10_9","title":"Flag & Return","duration":"9 min"},{"name":"gre_10_10","title":"Use The Calculator Wisely","duration":"6 min"},{"name":"gre_10_11","title":"Pacing & Section Strategy","duration":"2 min"},{"name":"gre_10_12","title":"Confident vs. Paranoid","duration":"3 min"},{"name":"gre_10_13","title":"There Is NO Partial Credit","duration":"6 min"},{"name":"gre_10_14","title":"Summary","duration":"12 min"}]}]
     
     
   
      var data = [





      //   {
      //   title: "Foundations of GRE Logic", 
      //   content: <div style={me}>
        
      //   <li>poop</li>
      //   <li>poop</li>
        
      //   </div>,
        
      // }, {
      //   title: "Arithmetic", 
      //   content: `Lorem ipsum dolor sit amet, 
      //             consectetur adipiscing elit, 
      //             sed do eiusmod tempor incididunt 
      //             ut labore et dolore magna aliqua. 
      //             Ut enim ad minim veniam, quis 
      //             nostrud exercitation ullamco laboris 
      //             nisi ut aliquip ex ea commodo consequat. 
      //             Duis aute irure dolor in reprehenderit 
      //             in voluptate velit esse cillum dolore 
      //             eu fugiat nulla pariatur. Excepteur 
      //             sint occaecat cupidatat non proident, 
      //             sunt in culpa qui officia deserunt 
      //             mollit anim id est laborum.`
      // },{
      //   title: "Text Completion and Sentence Equivalence", 
      //   content: `Lorem ipsum dolor sit amet, 
      //             consectetur adipiscing elit, 
      //             sed do eiusmod tempor incididunt 
      //             ut labore et dolore magna aliqua. 
      //             Ut enim ad minim veniam, quis 
      //             nostrud exercitation ullamco laboris 
      //             nisi ut aliquip ex ea commodo consequat. 
      //             Duis aute irure dolor in reprehenderit 
      //             in voluptate velit esse cillum dolore 
      //             eu fugiat nulla pariatur. Excepteur 
      //             sint occaecat cupidatat non proident, 
      //             sunt in culpa qui officia deserunt 
      //             mollit anim id est laborum.`
      // }



    ];

    for (let i = 0; i < fatArr.length; i++){
      data[i] = {title: fatArr[i]["name"]}
     };

     for (let i = 0; i < fatArr.length; i++){
      data[i]["content"] = 

      

      fatArr[i]["videos"].map(function(val){ return val.title })

      

      
     }

     for (let i = 0; i < data.length; i++){
      let newDiv = [];
      for (let b = 0; b < data[i]['content'].length; b++){
        newDiv.push(<li>  {data[i]['content'][b]}  </li>)

      }
      data[i]['content'] = newDiv;
     }

       console.log(data)
    
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
  height: '100vh'
};


const container = {
  backgroundColor: '#111539',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100vh',
  overflow: 'hidden'
  
}
const me = {
  listStyle: 'none',
}

